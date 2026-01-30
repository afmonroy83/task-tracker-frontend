import { useEffect, useState } from "react"
import { getTasks, createTask } from "../api/tasks"

export function useTasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function loadTasks() {
    try {
      const res = await getTasks()
      setTasks(res.data)
    } catch {
      setError("The task loading process failed.")
    } finally {
      setLoading(false)
    }
  }

  async function addTask(description) {
    try {
      const res = await createTask(description)
      setTasks(prev => [res.data, ...prev])
      setError(null)
    } catch (err) {
      setError(err.errors?.join(", ") || null)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return { tasks, loading, error, addTask }
}