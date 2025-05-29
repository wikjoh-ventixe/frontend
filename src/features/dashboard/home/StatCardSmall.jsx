import styles from './StatCardSmall.module.css'

const StatCardSmall = ({ icon, stat, statValue}) => {
  return (
    <div className={styles.card}>
      <div className={styles.icon}><img src={icon} /></div>
      <div className={styles.details}>
        <span className={styles.stat}>{stat}</span>
        <span className={styles.statValue}>{statValue}</span>
      </div>
    </div>
  )
}
export default StatCardSmall