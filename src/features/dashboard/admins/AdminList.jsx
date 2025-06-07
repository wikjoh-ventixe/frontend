import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import styles from './AdminList.module.css';
import { Search, ChevronDown } from 'lucide-react';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { getAllUserProfiles } from '../../../services/api';

const AdminList = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await getAllUserProfiles();
      setUsers(res.data);
    } catch(error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredCustomers = users.filter(user =>
    user.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.contactDetails.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.contactDetails.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

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
            {filteredCustomers.map((user) => (
              <tr key={user.userId} className={styles.row}>
                <td className={styles.td}>...{user.userId.slice(-12)}</td>
                <td className={styles.td}>{user.fullName}</td>
                <td className={styles.td}>{user.contactDetails.email}</td>
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
            {filteredCustomers.map((user) => (
              <tr key={user.id} className={styles.row}>
                <td className={styles.td}>...{user.userId.slice(-12)}</td>
                <td className={styles.td}>{user.fullName}</td>
                <td className={styles.td}>{user.contactDetails.email}</td>
                <td className={styles.td}>{user.contactDetails.phoneNumber}</td>
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