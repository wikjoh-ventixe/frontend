import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span className={styles.copyright}>Copyright © 2025 Ventixe</span>
      <span className={styles.links}>Privacy Policy</span>
      <span className={styles.links}>Terms and Conditions</span>
      <span className={styles.links}>Contact</span>
    </footer>
  )
}
export default Footer