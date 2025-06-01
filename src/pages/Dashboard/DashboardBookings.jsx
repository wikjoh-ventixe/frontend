import StatCardSmall from '../../features/dashboard/bookings/stat-card-small/StatCardSmall'
import RecentBookings from '../../features/dashboard/bookings/recent-bookings/RecentBookings'
import styles from './DashboardBookings.module.css'

const DashboardBookings = () => {
  return (
    <>
      <div className={styles.topStats}>
        <StatCardSmall icon="/icons/TicketIcon.svg" stat="Total Bookings" statValue='55,000' />
        <StatCardSmall icon="/icons/CheckmarkIcon.svg" stat="Total Tickets Sold" statValue='45,000' />
        <StatCardSmall icon="/icons/DollarIcon.svg" stat="Total Earnings" statValue='$275,450' />
      </div>

      <div className={styles.recentBookings}>
        <RecentBookings />
      </div>
    </>
  )
}
export default DashboardBookings