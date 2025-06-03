import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import styles from './RecentBookings.module.css';
import { Search, ChevronDown } from 'lucide-react';
import Button from '../../../../components/button/Button';
import useMediaQuery from '../../../../hooks/useMediaQuery';

const RecentBookings = () => {
  const smallTable = useMediaQuery('(max-width: 900px)');
  // const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState('This Week');

  // useEffect(() => {
  //   const fetchBookings = async () => {
  //     try {
  //       const response = await axios.get('/api/recent-bookings');
  //       setBookings(response.data);
  //     } catch (error) {
  //       console.error('Error fetching bookings:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchBookings();
  // }, []);

  const bookings = [
    {
      "bookingId": "B10011",
      "date": "2029/02/15",
      "time": "10:30 AM",
      "name": "Jackson Moore",
      "event": "Symphony Under the Stars",
      "category": "Music",
      "quantity": 2,
      "amount": 100,
      "status": "Confirmed"
    },
    {
      "bookingId": "B10012",
      "date": "2026/05/15",
      "time": "14:30 AM",
      "name": "P Diddy",
      "event": "Baby Oil Freakoff",
      "category": "N/A",
      "quantity": 1,
      "amount": 1000,
      "status": "Pending"
    },
    {
      "bookingId": "B10013",
      "date": "2027/05/15",
      "time": "20:00 AM",
      "name": "Ozzy Osbourne",
      "event": "Wacken Open Air",
      "category": "Music",
      "quantity": 1,
      "amount": 1000,
      "status": "Cancelled"
    }
  ]

  const filteredBookings = bookings.filter(booking =>
    booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.event.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // if (loading) {
  //   return <div className={styles.loading}>Loading...</div>;
  // }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Recent Bookings</h2>
        <div className={styles.controls}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search name, event, etc"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}>
              </input>
            <button className={styles.searchButton}>
              <Search size={18} />
            </button>
          </div>
        </div>
      </div>

      {smallTable
      ? (<div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>
                ID
                <ChevronDown size={10} />
              </th>
              <th className={styles.th}>
                Event
                <ChevronDown size={10} />
              </th>
              <th className={styles.th}>
                Amt
                <ChevronDown size={10} />
              </th>
              <th className={styles.th}>
                Status
                <ChevronDown size={10} />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.bookingId} className={styles.row}>
                <td className={styles.td}>{booking.bookingId}</td>
                <td className={styles.td}>
                  <div className={styles.eventInfo}>
                    <div>{booking.event}</div>
                    <div className={styles.category}>{booking.category}</div>
                  </div>
                </td>
                <td className={styles.td}>${booking.amount}</td>
                <td className={styles.td}>
                  <span className={clsx(styles.status, {
                    [styles.confirmed]: booking.status === 'Confirmed',
                    [styles.pending]: booking.status === 'Pending',
                    [styles.cancelled]: booking.status === 'Cancelled'
                  })}>
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>)
      : (<div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>
                Booking ID
                <ChevronDown size={10} />
              </th>
              <th className={styles.th}>
                Date
                <ChevronDown size={10} />
              </th>
              <th className={styles.th}>
                Name
                <ChevronDown size={10} />
              </th>
              <th className={styles.th}>
                Event
                <ChevronDown size={10} />
              </th>
              <th className={styles.th}>
                Qty
                <ChevronDown size={10} />
              </th>
              <th className={styles.th}>
                Amount
                <ChevronDown size={10} />
              </th>
              <th className={styles.th}>
                Status
                <ChevronDown size={10} />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.bookingId} className={styles.row}>
                <td className={styles.td}>{booking.bookingId}</td>
                <td className={styles.td}>
                  <div className={styles.dateTime}>
                    <div>{booking.date}</div>
                    <div className={styles.time}>{booking.time}</div>
                  </div>
                </td>
                <td className={styles.td}>{booking.name}</td>
                <td className={styles.td}>
                  <div className={styles.eventInfo}>
                    <div>{booking.event}</div>
                    <div className={styles.category}>{booking.category}</div>
                  </div>
                </td>
                <td className={styles.td}>{booking.quantity}</td>
                <td className={styles.td}>${booking.amount}</td>
                <td className={styles.td}>
                  <span className={clsx(styles.status, {
                    [styles.confirmed]: booking.status === 'Confirmed',
                    [styles.pending]: booking.status === 'Pending',
                    [styles.cancelled]: booking.status === 'Cancelled'
                  })}>
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>)
      }
    </div>
  );
};

export default RecentBookings; 