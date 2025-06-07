import axios from 'axios';

// Event service API
const eventApi = axios.create({
  baseURL: 'https://wikjoh-ventixe-eventservice-exfubhb0dne8cydm.swedencentral-01.azurewebsites.net/api',
  headers: {
    'Content-Type': 'application/json'
  },
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

export const getAllBookings = () => bookingApi.get('/Bookings');
export const createBooking = (data) => bookingApi.post('/Bookings', data);
export const deleteBooking = (id) => bookingApi.delete(`/Bookings/${id}`);


// User service API
const userApi = axios.create({
  baseURL: 'https://wikjoh-ventixe-userservice-a9fmcqcqcuh6dtcb.swedencentral-01.azurewebsites.net/api',
  headers: {
    'Content-Type': 'application/json'
  },
});

export const createUser = (data) => userApi.post('/Users', data);


// User profile service API
const userProfileApi = axios.create({
  baseURL: 'https://wikjoh-ventixe-userprofileservice-ccdvdaa7cyaycsc9.swedencentral-01.azurewebsites.net/api',
  headers: {
    'Content-Type': 'application/json'
  },
});

export const getAllUserProfiles = () => userProfileApi.get('/UserProfiles');
export const getUserProfile = (id) => userProfileApi.get(`/UserProfiles/${id}`)


// User profile service API
const customerProfileApi = axios.create({
  baseURL: 'https://wikjoh-ventixe-customerprofileservice-bchth5ahhchwfeec.swedencentral-01.azurewebsites.net/api',
  headers: {
    'Content-Type': 'application/json'
  },
});

export const getAllCustomerProfiles = () => customerProfileApi.get('/CustomerProfiles');
export const getCustomerProfile = (id) => customerProfileApi.get(`/CustomerProfiles/${id}`)