import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('tasks API', () => {
  let getTasks, createTask

  beforeEach(async () => {
    // Clear fetch mock
    global.fetch = vi.fn()
    
    // Import the module after setting up the mock
    // This ensures the environment variables are read correctly
    const tasksModule = await import('./tasks')
    getTasks = tasksModule.getTasks
    createTask = tasksModule.createTask
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('getTasks', () => {
    it('should fetch tasks successfully', async () => {
      const mockTasks = {
        data: [
          { id: 1, description: 'Task 1' },
          { id: 2, description: 'Task 2' }
        ]
      }

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockTasks
      })

      const result = await getTasks()

      const callArgs = global.fetch.mock.calls[0]
      expect(callArgs[0]).toContain('/tasks')
      expect(callArgs[1].headers).toMatchObject({
        'Content-Type': 'application/json',
        'X-API-TOKEN': expect.any(String)
      })

      expect(result).toEqual(mockTasks)
    })

    it('should throw error when fetch fails', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500
      })

      await expect(getTasks()).rejects.toThrow('Fetch failed')
    })

    it('should use correct headers', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: [] })
      })

      await getTasks()

      const callArgs = global.fetch.mock.calls[0]
      expect(callArgs[0]).toContain('/tasks')
      expect(callArgs[1].headers).toMatchObject({
        'Content-Type': 'application/json',
        'X-API-TOKEN': expect.any(String)
      })
    })
  })

  describe('createTask', () => {
    it('should create task successfully', async () => {
      const newTask = {
        data: { id: 1, description: 'New Task' }
      }

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => newTask
      })

      const result = await createTask('New Task')

      const callArgs = global.fetch.mock.calls[0]
      expect(callArgs[0]).toContain('/tasks')
      expect(callArgs[1]).toMatchObject({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-TOKEN': expect.any(String)
        },
        body: JSON.stringify({ task: { description: 'New Task' } })
      })

      expect(result).toEqual(newTask)
    })

    it('should throw error when creation fails', async () => {
      const errorResponse = {
        errors: ['Description is required']
      }

      global.fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => errorResponse
      })

      await expect(createTask('')).rejects.toEqual(errorResponse)
    })

    it('should send correct request body', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: {} })
      })

      await createTask('Test Description')

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: JSON.stringify({ task: { description: 'Test Description' } })
        })
      )
    })
  })
})
