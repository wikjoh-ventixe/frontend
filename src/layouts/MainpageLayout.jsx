import { Outlet } from 'react-router-dom';
import styles from './MainpageLayout.module.css'
import Header from '../features/mainpage/components/header/Header';
import Footer from '../features/footer/Footer';
import { useAuth } from '../contexts/AuthContext';

const MainpageLayout = () => {
  const { isLoggedIn, logout } = useAuth();

  const handleAuthAction = () => {
    if (isLoggedIn) {
      logout(); // Call logout from auth context
    } else {
      // redirect to login
      window.location.href = '/auth/login';
    }
  };

  return (
    <div className={styles.mainpageWrapper}>
      <Header isLoggedIn={isLoggedIn} handleAuthAction={handleAuthAction} />
      <Outlet />
      <Footer />
    </div>
  )
}

export default MainpageLayout