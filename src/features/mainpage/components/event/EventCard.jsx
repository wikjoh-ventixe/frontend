import styles from './EventCard.module.css'

const EventCardGrid = ({ event }) => {
  const percentageSold = (event.ticketsSold / event.maxBookings * 100);

  let priceFrom, currency;
  if (event.packages && event.packages.length > 0) {
    const lowestPackage = event.packages.reduce((min, current) =>
      current.price < min.price ? current : min
    );
    priceFrom = lowestPackage.price;
    currency = lowestPackage.currency;
  }


  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img className={styles.eventImage} src={event.image} />
        <div className={styles.category}>
          <span>{event.category}</span>
        </div>
        <div className={styles.status}>
          <span>{currency}{priceFrom}</span>
        </div>
      </div>
      <div className={styles.detailsContainer}>
        <span className={styles.date}>{event.date}</span>
        <h3 className={styles.title}>{event.title}</h3>
        <div className={styles.locationContainer}>
          <img className={styles.locationIcon} src="/icons/LocationIcon.svg"></img>
          <span className={styles.location}>{event.location}</span>
        </div>
      </div>
    </div>
  )
}
export default EventCardGrid