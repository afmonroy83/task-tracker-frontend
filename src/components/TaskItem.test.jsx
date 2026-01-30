import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TaskItem from './TaskItem'

describe('TaskItem', () => {
  it('should render task description', () => {
    const task = {
      id: 1,
      description: 'Test task'
    }

    render(<TaskItem task={task} />)
    
    expect(screen.getByText('Test task')).toBeInTheDocument()
  })

  it('should render task with different description', () => {
    const task = {
      id: 2,
      description: 'Another task'
    }

    render(<TaskItem task={task} />)
    
    expect(screen.getByText('Another task')).toBeInTheDocument()
  })
})
