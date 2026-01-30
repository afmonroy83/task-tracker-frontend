import { useEffect, useState } from "react"
import { fetchTasks, createTask } from "./api"

export default function TaskList() {
  const [tasks, setTasks] = useState([])
  const [description, setDescription] = useState("")
  const [error, setError] = useState(null)

  useEffect(() => {
    loadTasks()
  }, [])

  async function loadTasks() {
    try {
      const response = await fetchTasks()
      setTasks(response.data)
    } catch (err) {
      setError("No se pudieron cargar las tareas")
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    try {
      const response = await createTask(description)
      setTasks([response.data, ...tasks])
      setDescription("")
    } catch (err) {
      setError(err.errors?.join(", ") || "Error creando la tarea")
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Task Tracker</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={description}
          placeholder="Nueva tarea"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.description}</li>
        ))}
      </ul>
    </div>
  )
}
