import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskForm from './TaskForm'

describe('TaskForm', () => {
  it('should render form with input and button', () => {
    const mockOnSubmit = vi.fn()
    render(<TaskForm onSubmit={mockOnSubmit} />)
    
    expect(screen.getByPlaceholderText('New task...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
  })

  it('should update input value when typing', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = vi.fn()
    render(<TaskForm onSubmit={mockOnSubmit} />)
    
    const input = screen.getByPlaceholderText('New task...')
    await user.type(input, 'New task description')
    
    expect(input).toHaveValue('New task description')
  })

  it('should call onSubmit when form is submitted with valid input', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = vi.fn().mockResolvedValue()
    render(<TaskForm onSubmit={mockOnSubmit} />)
    
    const input = screen.getByPlaceholderText('New task...')
    const button = screen.getByRole('button', { name: 'Add' })
    
    await user.type(input, 'New task')
    await user.click(button)
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith('New task')
    })
  })

  it('should not call onSubmit when input is empty', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = vi.fn()
    render(<TaskForm onSubmit={mockOnSubmit} />)
    
    const button = screen.getByRole('button', { name: 'Add' })
    await user.click(button)
    
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('should not call onSubmit when input only has whitespace', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = vi.fn()
    render(<TaskForm onSubmit={mockOnSubmit} />)
    
    const input = screen.getByPlaceholderText('New task...')
    const button = screen.getByRole('button', { name: 'Add' })
    
    await user.type(input, '   ')
    await user.click(button)
    
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('should clear input after successful submission', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = vi.fn().mockResolvedValue()
    render(<TaskForm onSubmit={mockOnSubmit} />)
    
    const input = screen.getByPlaceholderText('New task...')
    const button = screen.getByRole('button', { name: 'Add' })
    
    await user.type(input, 'New task')
    await user.click(button)
    
    await waitFor(() => {
      expect(input).toHaveValue('')
    })
  })

  it('should show loading state when submitting', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = vi.fn(() => new Promise(resolve => setTimeout(resolve, 100)))
    render(<TaskForm onSubmit={mockOnSubmit} />)
    
    const input = screen.getByPlaceholderText('New task...')
    const button = screen.getByRole('button', { name: 'Add' })
    
    await user.type(input, 'New task')
    await user.click(button)
    
    expect(screen.getByRole('button', { name: 'Adding...' })).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
