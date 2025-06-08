import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import styles from './RecentBookings.module.css';
import { Search, ChevronDown } from 'lucide-react';
import Button from '../../../../components/button/Button';
import useMediaQuery from '../../../../hooks/useMediaQuery';
import { getAllBookings } from '../../../../services/api';

const RecentBookings = () => {
  const smallTable = useMediaQuery('(max-width: 900px)');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState('This Week');

  const fetchBookings = async () => {
    try { 
      const res = await getAllBookings();
      setBookings(res.data);
    } catch(error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBookings();
  }, []);


  const filteredBookings = bookings.filter(booking =>
    booking.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.customerId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

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
              <tr key={booking.id} className={styles.row}>
                <td className={styles.td}>...{booking.id.slice(-12)}</td>
                <td className={styles.td}>
                  <div className={styles.eventInfo}>
                    <div>eventTitle</div>
                    <div className={styles.category}>category</div>
                  </div>
                </td>
                <td className={styles.td}>$amount</td>
                <td className={styles.td}>
                  <span className={clsx(styles.status, {
                    [styles.confirmed]: booking.status === 'Confirmed',
                    [styles.pending]: booking.status === 'Pending',
                    [styles.cancelled]: booking.status === 'Cancelled'
                  })}>
                    {/* {booking.status} */'status'}
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
              <tr key={booking.id} className={styles.row}>
                <td className={styles.td}>...{booking.id.slice(-12)}</td>
                <td className={styles.td}>
                  <div className={styles.dateTime}>
                    <div>{new Date(booking.bookingDate).toISOString().slice(0,10)}</div>
                    <div className={styles.time}>{new Date(booking.bookingDate).toISOString().split('T')[1].slice(0, 5)}</div>
                  </div>
                </td>
                <td className={styles.td}>customerName</td>
                <td className={styles.td}>
                  <div className={styles.eventInfo}>
                    <div>eventTitle</div>
                    <div className={styles.category}>Category</div>
                  </div>
                </td>
                <td className={styles.td}>{booking.ticketQuantity}</td>
                <td className={styles.td}>$amount</td>
                <td className={styles.td}>
                  <span className={clsx(styles.status, {
                    [styles.confirmed]: booking.status === 'Confirmed',
                    [styles.pending]: booking.status === 'Pending',
                    [styles.cancelled]: booking.status === 'Cancelled'
                  })}>
                    {/* {booking.status} */'status'}
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