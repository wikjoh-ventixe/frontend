import { NavLink, useLocation } from 'react-router-dom';
import styles from './Nav.module.css'
import BookingIcon from '../../components/icons/BookingIcon';
import DashboardIcon from '../../components/icons/DashboardIcon';
import EventsIcon from '../../components/icons/EventsIcon';
import UserIcon from '../../components/icons/AdminIcon';
import CustomerIcon from '../../components/icons/CustomerIcon';
import AdminIcon from '../../components/icons/AdminIcon';
import useMediaQuery from '../../hooks/useMediaQuery';
import { Menu } from 'lucide-react'
import { useEffect, useState } from 'react';

const Nav = () => {
  const location = useLocation();
  const pathsegments = location.pathname.split('/').filter(Boolean);
  const lastSegment = pathsegments[pathsegments.length - 1];
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isOpen, setIsOpen] = useState(false)

  // on resize, close mobile nav bar
  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  })

  const toggleMenu = () => setIsOpen(prev => !prev);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard/home', icon: DashboardIcon },
    { name: 'Bookings', path: '/dashboard/bookings', icon: BookingIcon },
    { name: 'Events', path: '/dashboard/events', icon: EventsIcon },
    { name: 'Customers', path: '/dashboard/customers', icon: CustomerIcon },
    { name: 'Admins', path: '/dashboard/admins', icon: AdminIcon }
  ];

  if (!isMobile) {
    return (
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <img src="/images/logo.svg" />
          <h2>Ventixe</h2>
        </div>
  
  
        <ul className={styles.navLinks}>
          {navItems.map(item => (
          <li key={item.path}>
            <NavLink to={item.path}>
              {({ isActive }) => (
                <>
                  <span className={styles.iconSpan}>{<item.icon isActive={isActive} />}</span>
                  <span className={styles.itemName}>{item.name}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
        </ul>
      </nav>
    )
  }

  return(
    <nav className={styles.mobileNav}>
      <div className={styles.mobileNavTop}>
        <div className={styles.logoContainer}>
          <img src="/images/logo.svg" />
        </div>
        <span className={styles.title}>{lastSegment}</span>
        <button onClick={toggleMenu} className={styles.burgerButton}>
          <Menu />
        </button>
      </div>

        {isOpen && (
          <div className={styles.navLinkContainer}>
            <ul className={styles.mobileNavLinks}>
            {navItems.map(item => (
              <li key={item.path} onClick={toggleMenu}>
              <NavLink to={item.path}>
                {({ isActive }) => (
                  <>
                    <span className={styles.iconSpan}>{<item.icon isActive={isActive} />}</span>
                    <span className={styles.itemName}>{item.name}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
          </ul>
        </div>
        )}
    </nav>
  )

}
export default Nav