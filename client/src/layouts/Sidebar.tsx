import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <span className={styles.header}>Sensor Flow</span>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
            >
              대시보드
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/sensors"
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
            >
              센서 관리
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
            >
              설정
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}