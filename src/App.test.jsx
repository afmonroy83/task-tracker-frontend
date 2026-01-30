import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import * as tasksApi from './api/tasks'

// Mock the API module
vi.mock('./api/tasks', () => ({
  getTasks: vi.fn(),
  createTask: vi.fn()
}))

// Mock the useTasks hook
vi.mock('./hooks/useTasks', () => ({
  useTasks: vi.fn()
}))

import { useTasks } from './hooks/useTasks'

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render Task Tracker title', () => {
    useTasks.mockReturnValue({
      tasks: [],
      loading: false,
      error: null,
      addTask: vi.fn()
    })

    render(<App />)
    
    expect(screen.getByText('Task Tracker')).toBeInTheDocument()
  })

  it('should render TaskForm', () => {
    useTasks.mockReturnValue({
      tasks: [],
      loading: false,
      error: null,
      addTask: vi.fn()
    })

    render(<App />)
    
    expect(screen.getByPlaceholderText('New task...')).toBeInTheDocument()
  })

  it('should show loading message when loading', () => {
    useTasks.mockReturnValue({
      tasks: [],
      loading: true,
      error: null,
      addTask: vi.fn()
    })

    render(<App />)
    
    expect(screen.getByText('Cargando...')).toBeInTheDocument()
  })

  it('should show error message when there is an error', () => {
    useTasks.mockReturnValue({
      tasks: [],
      loading: false,
      error: 'Error loading tasks',
      addTask: vi.fn()
    })

    render(<App />)
    
    expect(screen.getByText('Error loading tasks')).toBeInTheDocument()
  })

  it('should render TaskList with tasks', () => {
    const tasks = [
      { id: 1, description: 'Task 1' },
      { id: 2, description: 'Task 2' }
    ]

    useTasks.mockReturnValue({
      tasks,
      loading: false,
      error: null,
      addTask: vi.fn()
    })

    render(<App />)
    
    expect(screen.getByText('Task 1')).toBeInTheDocument()
    expect(screen.getByText('Task 2')).toBeInTheDocument()
  })
})
