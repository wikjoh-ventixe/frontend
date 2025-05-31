import styles from './EventCardGrid.module.css'

const EventCardGrid = ({ event }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img className={styles.eventImage} src={event.imageURI} />
        <div className={styles.category}>
          <span>{event.category}</span>
        </div>
        <div className={styles.status}>
          <span>{event.status}</span>
        </div>
      </div>
      <div className={styles.detailsContainer}>
        <span className={styles.date}>{event.date}</span>
        <h3 className={styles.title}>{event.title}</h3>
        <div className={styles.locationContainer}>
          <img className={styles.locationIcon} src="/icons/LocationIcon.svg"></img>
          <span className={styles.location}>{event.location}</span>
        </div>
        <div className={styles.stats}>
          <div className={styles.meter}>
            <div className={styles.meterBg}>
              <div className={styles.meterProgress} style={{ width: `${event.percentageSold}%` }}></div>
            </div>
            <span className={styles.meterText}>{event.percentageSold}%</span>
          </div>
          <span className={styles.price}>{event.price}</span>
        </div>
      </div>
    </div>
  )
}
export default EventCardGrid