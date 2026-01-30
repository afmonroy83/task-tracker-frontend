import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { useTasks } from './useTasks'
import * as tasksApi from '../api/tasks'

// Mock the API module
vi.mock('../api/tasks', () => ({
  getTasks: vi.fn(),
  createTask: vi.fn()
}))

describe('useTasks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should load tasks on mount', async () => {
    const mockTasks = [
      { id: 1, description: 'Task 1' },
      { id: 2, description: 'Task 2' }
    ]

    tasksApi.getTasks.mockResolvedValue({
      data: mockTasks
    })

    const { result } = renderHook(() => useTasks())

    expect(result.current.loading).toBe(true)
    expect(result.current.tasks).toEqual([])

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.tasks).toEqual(mockTasks)
    expect(tasksApi.getTasks).toHaveBeenCalledOnce()
  })

  it('should handle error when loading tasks fails', async () => {
    tasksApi.getTasks.mockRejectedValue(new Error('Network error'))

    const { result } = renderHook(() => useTasks())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe('The task loading process failed.')
    expect(result.current.tasks).toEqual([])
  })

  it('should add a new task', async () => {
    const initialTasks = [
      { id: 1, description: 'Task 1' }
    ]

    const newTask = { id: 2, description: 'New Task' }

    tasksApi.getTasks.mockResolvedValue({
      data: initialTasks
    })

    tasksApi.createTask.mockResolvedValue({
      data: newTask
    })

    const { result } = renderHook(() => useTasks())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.tasks).toEqual(initialTasks)

    await act(async () => {
      await result.current.addTask('New Task')
    })

    expect(result.current.tasks).toEqual([newTask, ...initialTasks])
    expect(tasksApi.createTask).toHaveBeenCalledWith('New Task')
  })

  it('should handle error when creating task fails', async () => {
    const initialTasks = [
      { id: 1, description: 'Task 1' }
    ]

    tasksApi.getTasks.mockResolvedValue({
      data: initialTasks
    })

    const errorResponse = {
      errors: ['Description is required', 'Description too short']
    }

    tasksApi.createTask.mockRejectedValue(errorResponse)

    const { result } = renderHook(() => useTasks())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    await act(async () => {
      await result.current.addTask('')
    })

    await waitFor(() => {
      expect(result.current.error).toBe('Description is required, Description too short')
    })
    expect(result.current.tasks).toEqual(initialTasks)
  })

  it('should handle error when creating task fails without errors array', async () => {
    const initialTasks = [
      { id: 1, description: 'Task 1' }
    ]

    tasksApi.getTasks.mockResolvedValue({
      data: initialTasks
    })

    tasksApi.createTask.mockRejectedValue(new Error('Network error'))

    const { result } = renderHook(() => useTasks())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    await act(async () => {
      await result.current.addTask('New Task')
    })

    // Error should be null when there's no errors array
    expect(result.current.error).toBeNull()
    expect(result.current.tasks).toEqual(initialTasks)
  })
})
