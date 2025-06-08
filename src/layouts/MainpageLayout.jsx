import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './MainpageLayout.module.css'
import Header from '../features/mainpage/components/header/Header';
import Footer from '../features/footer/Footer';

const MainpageLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuthAction = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false); // logout
    } else {
      // redirect to login or open login modal
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