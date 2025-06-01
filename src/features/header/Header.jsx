import { useLocation } from 'react-router-dom';
import styles from './Header.module.css'

const Header = () => {
  const location = useLocation();
  const pathsegments = location.pathname.split('/').filter(Boolean);
  const lastSegment = pathsegments[pathsegments.length - 1];

  return (
    <header className={styles.header}>
      {lastSegment !== 'home'
      ? (<div className={styles.containerLeftDynamic}>
          <h4>{lastSegment}</h4>
        </div>)
        
      : (<div className={styles.containerLeft}>
          <h4>Dashboard</h4>
          <span className={styles.subText}>Hello User, welcome back!</span>
        </div>)
      }

      <div className={styles.containerRight}>
        <span className={styles.username}>User Name</span>
        <span className={styles.subText}>Admin</span>
      </div>
    </header>
  )
}
export default Header