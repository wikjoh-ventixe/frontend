import styles from './Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.containerLeft}>
        <h4>Dashboard</h4>
        <span className={styles.subText}>Hello User, welcome back!</span>
      </div>
      <div className={styles.containerRight}>
        <span className={styles.username}>User Name</span>
        <span className={styles.subText}>Admin</span>
      </div>
    </header>
  )
}
export default Header