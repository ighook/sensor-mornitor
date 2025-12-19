import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <span className={styles.header}>Sensor Flow</span>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">대시보드</Link>
          </li>
          <li>
            <Link to="/sensors">센서 관리</Link>
          </li>
          <li>
            <Link to="/settings">설정</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
