import TaskItem from "./TaskItem";
import styles from "../styles/taskList.module.css";

export default function TaskList({ tasks }) {
  if (tasks.length === 0) {
    return <p>No tasks yet</p>;
  }

  return (
    <ul className={styles.list}>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
