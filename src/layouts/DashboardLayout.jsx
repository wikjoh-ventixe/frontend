import Nav from "../features/nav/Nav"
import Header from "../features/header/Header"
import Footer from "../features/footer/Footer"

import styles from "./DashboardLayout.module.css"
import { Outlet } from "react-router-dom"

const DashboardLayout = () => {
  return (
    <div className={styles.dashboardWrapper}>
      <Nav />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
export default DashboardLayout