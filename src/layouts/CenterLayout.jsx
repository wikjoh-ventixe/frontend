import { Outlet } from "react-router-dom"
import styles from "./CenterLayout.module.css"

const CenterLayout = () => {
  return (
    <div className={styles.centerWrapper}>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
export default CenterLayout