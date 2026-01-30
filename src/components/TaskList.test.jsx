import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TaskList from './TaskList'

describe('TaskList', () => {
  it('should render "No tasks yet" when tasks array is empty', () => {
    render(<TaskList tasks={[]} />)
    
    expect(screen.getByText('No tasks yet')).toBeInTheDocument()
  })

  it('should render list of tasks', () => {
    const tasks = [
      { id: 1, description: 'Task 1' },
      { id: 2, description: 'Task 2' },
      { id: 3, description: 'Task 3' }
    ]

    render(<TaskList tasks={tasks} />)
    
    expect(screen.getByText('Task 1')).toBeInTheDocument()
    expect(screen.getByText('Task 2')).toBeInTheDocument()
    expect(screen.getByText('Task 3')).toBeInTheDocument()
  })

  it('should render single task', () => {
    const tasks = [
      { id: 1, description: 'Single task' }
    ]

    render(<TaskList tasks={tasks} />)
    
    expect(screen.getByText('Single task')).toBeInTheDocument()
    expect(screen.queryByText('No tasks yet')).not.toBeInTheDocument()
  })
})
