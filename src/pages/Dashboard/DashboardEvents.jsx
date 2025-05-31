import styles from './DashboardEvents.module.css'
import EventCardGrid from "../../features/dashboard/events/EventCardGrid"

const DashboardEvents = () => {
  const events = [
    {
      id: "1",
      title: "Adventure Gear Show",
      date: "June 5, 2029 - 3:00 PM",
      location: "Rocky Ridge Exhibition Hall, Denver, CO",
      percentageSold: "65",
      price: "$40",
      category: "Outdoor & Adventure",
      status: "Active",
      imageURI: "/images/ExampleImage.jpg"
    },
    {
      id: "2",
      title: "Adventure Gear Show",
      date: "June 5, 2029 - 3:00 PM",
      location: "Rocky Ridge Exhibition Hall, Denver, CO",
      percentageSold: "65",
      price: "$40",
      category: "Outdoor & Adventure",
      status: "Active",
      imageURI: "/images/ExampleImage2.jpg"
    }
  ];


  return (
    <div className={styles.eventGrid}>
      {events.map(event => (
        <EventCardGrid event={event} key={event.id} />
      ))}
    </div>
  )
}
export default DashboardEvents