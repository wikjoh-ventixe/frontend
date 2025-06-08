import { useLocation, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import styles from './Header.module.css'

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathsegments = location.pathname.split('/').filter(Boolean);
  const lastSegment = pathsegments[pathsegments.length - 1];

  const handleLogout = () => {
    // Clear admin authentication data
    localStorage.removeItem('admin_jwt_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_type');
    
    // Redirect to login page
    navigate('/dashboard/login');
  };

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
        <div className={styles.userInfo}>
          <span className={styles.username}>User Name</span>
          <span className={styles.subText}>Admin</span>
        </div>
        <button className={styles.logoutButton} onClick={handleLogout} title="Logout">
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  )
}
export default Header