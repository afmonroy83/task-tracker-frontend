import styles from "../styles/taskList.module.css";

export default function TaskItem({ task }) {
  return (
    <li className={styles.item}>
      {task.description}
    </li>
  );
}
