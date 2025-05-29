import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css'
import BookingIcon from '../../components/icons/BookingIcon';
import DashboardIcon from '../../components/icons/DashboardIcon';
import EventsIcon from '../../components/icons/EventsIcon';

const Nav = () => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard/home', icon: DashboardIcon },
    { name: 'Bookings', path: '/dashboard/bookings', icon: BookingIcon },
    { name: 'Events', path: '/dashboard/events', icon: EventsIcon }
  ];

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <img src="/images/logo.svg" />
        <h2>Ventixe</h2>
      </div>


      <ul className={styles.navLinks}>
        {navItems.map(item => (
        <li>
          <NavLink key={item.path} to={item.path}>
            {({ isActive }) => (
              <>
                <span className={styles.iconSpan}>{<item.icon isActive={isActive} />}</span>
                <span>{item.name}</span>
              </>
            )}
          </NavLink>
        </li>
      ))}
      </ul>
    </nav>
  )
}
export default Nav