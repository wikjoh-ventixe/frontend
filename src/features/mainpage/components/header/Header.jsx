import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

const Header = ({ isLoggedIn = false, handleAuthAction }) => {
  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logo}>
        <img src="/images/logo.svg" alt="Ventixe Logo" />
        <h2>Ventixe</h2>
      </NavLink>
      <div className={styles.authSection}>
        <button className={styles.authButton} onClick={handleAuthAction}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
      </div>
    </header>
  )
}
export default Header