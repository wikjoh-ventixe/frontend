import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import styles from './CustomerList.module.css';
import { Search, ChevronDown } from 'lucide-react';
import Button from '../../../components/button/Button';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { getAllCustomerProfiles } from '../../../services/api';

const CustomerList = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState('This Week');

  const fetchCustomers = async () => {
    try {
      const res = await getAllCustomerProfiles();
      setCustomers(res.data);
    } catch(error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);


  const filteredCustomers = customers.filter(customer =>
    customer.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.contactDetails.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.contactDetails.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
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
                Customer Id
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
            {filteredCustomers.map((customer) => (
              <tr key={customer.userId} className={styles.row}>
                <td className={styles.td}>...{customer.userId.slice(-12)}</td>
                <td className={styles.td}>{customer.fullName}</td>
                <td className={styles.td}>{customer.contactDetails.email}</td>
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
                Customer Id
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
            {filteredCustomers.map((customer) => (
              <tr key={customer.userId} className={styles.row}>
                <td className={styles.td}>...{customer.userId.slice(-12)}</td>
                <td className={styles.td}>{customer.fullName}</td>
                <td className={styles.td}>{customer.contactDetails.email}</td>
                <td className={styles.td}>{customer.contactDetails.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>)
      }
    </div>
  );
};

export default CustomerList; 