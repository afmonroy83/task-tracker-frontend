import { useTasks } from "./hooks/useTasks"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"
import styles from "./styles/app.module.css"

function App() {
  const { tasks, loading, error, addTask } = useTasks()

  return (
    <div className={styles.container}>
      <h1>Task Tracker</h1>

      <TaskForm onSubmit={addTask} />

      {loading && <p>Cargando...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <TaskList tasks={tasks} />
    </div>
  )
}

export default App
