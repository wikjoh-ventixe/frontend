import axios from 'axios';

// Auth service API
const authApi = axios.create({
  baseURL: 'https://wikjoh-ventixe-authservice-ehhcdvdeavamg2gz.swedencentral-01.azurewebsites.net/api',
  headers: {
    'Content-Type': 'application/json'
  },
});

export const registerCustomer = (data) => authApi.post('/CustomerAuth/register', data);
export const loginCustomer = (data) => authApi.post('/CustomerAuth/login', data);
export const loginUser = (data) => authApi.post('/UserAuth/login', data);

// Event service API
const eventApi = axios.create({
  baseURL: 'https://wikjoh-ventixe-eventservice-exfubhb0dne8cydm.swedencentral-01.azurewebsites.net/api',
  headers: {
    'Content-Type': 'application/json'
  },
});

// Add auth interceptor for event API (admin endpoints)
eventApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Events
export const getAllEvents = () => eventApi.get('/Events');
export const getAllEventsWithTicketsSold = () => eventApi.get('/Events/withTicketsSold');
export const getEvent = (id) => eventApi.get(`/Events/${id}`);
export const createEvent = (data) => eventApi.post('/Events', data);
export const updateEvent = (data) => eventApi.put('/Events', data);
export const deleteEvent = (id) => eventApi.delete(`/Events/${id}`);

// Event-packages
export const getPackagesByEventId = (id) => eventApi.get(`/Packages/${id}`);
export const createPackage = (data) => eventApi.post('/Packages', data);
export const updatePackage = (data) => eventApi.put('/Packages', data);
export const deletePackage = (id) => eventApi.delete(`/Packages/${id}`);


// Booking service API
const bookingApi = axios.create({
  baseURL: 'https://wikjoh-ventixe-bookingservice-b4cjdvdkgcgvcsgh.swedencentral-01.azurewebsites.net/api',
  headers: {
    'Content-Type': 'application/json'
  },
});

// Create separate axios instance for admin booking endpoints
const adminBookingApi = axios.create({
  baseURL: 'https://wikjoh-ventixe-bookingservice-b4cjdvdkgcgvcsgh.swedencentral-01.azurewebsites.net/api',
  headers: {
    'Content-Type': 'application/json'
  },
});

// Add auth interceptor for customer booking API (createBooking)
bookingApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add auth interceptor for admin booking API (getAllBookings, deleteBooking)
adminBookingApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getAllBookings = () => adminBookingApi.get('/Bookings');
export const createBooking = (data) => bookingApi.post('/Bookings', data);
export const deleteBooking = (id) => adminBookingApi.delete(`/Bookings/${id}`);


// User service API
const userApi = axios.create({
  baseURL: 'https://wikjoh-ventixe-userservice-a9fmcqcqcuh6dtcb.swedencentral-01.azurewebsites.net/api',
  headers: {
    'Content-Type': 'application/json'
  },
});

// Add auth interceptor for user API (admin endpoints)
userApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createUser = (data) => userApi.post('/Users', data);


// User profile service API
const userProfileApi = axios.create({
  baseURL: 'https://wikjoh-ventixe-userprofileservice-ccdvdaa7cyaycsc9.swedencentral-01.azurewebsites.net/api',
  headers: {
    'Content-Type': 'application/json'
  },
});

// Add auth interceptor for user profile API (admin endpoints)
userProfileApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getAllUserProfiles = () => userProfileApi.get('/UserProfiles');
export const getUserProfile = (id) => userProfileApi.get(`/UserProfiles/${id}`)


// Customer profile service API
const customerProfileApi = axios.create({
  baseURL: 'https://wikjoh-ventixe-customerprofileservice-bchth5ahhchwfeec.swedencentral-01.azurewebsites.net/api',
  headers: {
    'Content-Type': 'application/json'
  },
});

// Add auth interceptor for customer profile API (admin endpoints)
customerProfileApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getAllCustomerProfiles = () => customerProfileApi.get('/CustomerProfiles');
export const getCustomerProfile = (id) => customerProfileApi.get(`/CustomerProfiles/${id}`)