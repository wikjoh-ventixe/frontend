import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import styles from './AdminList.module.css';
import { Search, ChevronDown } from 'lucide-react';
import useMediaQuery from '../../../hooks/useMediaQuery';

const AdminList = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  // const [customers, setCustomers] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  const admins = [
    {
      "id": "1",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+1234567890",
    },
    {
      "id": "2",
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "phone": "+1234567666",
    },
    {
      "id": "3",
      "name": "John Smith",
      "email": "john.smith@example.com",
      "phone": "+1234567333",
    }
  ]

  const filteredCustomers = admins.filter(admin =>
    admin.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // if (loading) {
  //   return <div className={styles.loading}>Loading...</div>;
  // }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.controls}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search name, id, email, phone etc"
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

      {isMobile 
      ? (<div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>
                Admin Id
                <ChevronDown size={10} />
              </th>
              <th className={styles.th}>
                Name
                <ChevronDown size={10} />
              </th>
              <th className={styles.th}>
                Email
                <ChevronDown size={10} />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((admin) => (
              <tr key={admin.id} className={styles.row}>
                <td className={styles.td}>{admin.id}</td>
                <td className={styles.td}>{admin.name}</td>
                <td className={styles.td}>{admin.email}</td>
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
                Admin Id
                <ChevronDown size={10} />
              </th>
              <th className={styles.th}>
                Name
                <ChevronDown size={10} />
              </th>
              <th className={styles.th}>
                Email
                <ChevronDown size={10} />
              </th>
              <th className={styles.th}>
                Phone
                <ChevronDown size={10} />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((admin) => (
              <tr key={admin.id} className={styles.row}>
                <td className={styles.td}>{admin.id}</td>
                <td className={styles.td}>{admin.name}</td>
                <td className={styles.td}>{admin.email}</td>
                <td className={styles.td}>{admin.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>)
      }
    </div>
  );
};

export default AdminList; 