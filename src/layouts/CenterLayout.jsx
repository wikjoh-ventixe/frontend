import { Outlet } from "react-router-dom"
import styles from "./CenterLayout.module.css"

const CenterLayout = () => {
  return (
    <div className={styles.centerWrapper}>
      <main>
        Centerered Layout
        <Outlet />
      </main>
    </div>
  )
}
export default CenterLayout