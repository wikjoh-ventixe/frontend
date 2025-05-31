import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css'
import BookingIcon from '../../components/icons/BookingIcon';
import DashboardIcon from '../../components/icons/DashboardIcon';
import EventsIcon from '../../components/icons/EventsIcon';
import UserIcon from '../../components/icons/AdminIcon';
import CustomerIcon from '../../components/icons/CustomerIcon';
import AdminIcon from '../../components/icons/AdminIcon';

const Nav = () => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard/home', icon: DashboardIcon },
    { name: 'Bookings', path: '/dashboard/bookings', icon: BookingIcon },
    { name: 'Events', path: '/dashboard/events', icon: EventsIcon },
    { name: 'Customers', path: '/dashboard/customers', icon: CustomerIcon },
    { name: 'Admins', path: '/dashboard/admins', icon: AdminIcon }
  ];

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