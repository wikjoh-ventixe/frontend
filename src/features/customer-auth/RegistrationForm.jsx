import { useState } from 'react'
import styles from './RegistrationForm.module.css'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import Button from '../../components/button/Button'

const RegistrationForm = () => {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const handleOk = () => {
    setSubmitted(false)
    reset()
  }

  const onSubmit = async (data) => {
    const res = await axios.post('api', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.status === 200) {
      setSubmitted(true)
      reset()
    }
  }

  if (submitted) {
    return (
      <>
        <div className={styles.logo}>
          <div className={styles.logoImage}>
            <img src="/images/logo.svg" />
          </div>
          <h1>Ventixe</h1>
        </div>

        <div className={styles.informationBox}>
          <h1>Tack för ditt meddelande!</h1>
          <p>Vi återkommer till dig så snart vi kan.</p>
          <button className={styles.btnGreen} onClick={handleOk}>OK</button>
        </div>
      </>
    )
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.logo}>
          <div className={styles.logoImage}>
            <img src="/images/logo.svg" />
          </div>
          <h1>Ventixe</h1>
        </div>

        <div className={styles.formBody}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email address</label>
            <input type="text" placeholder="Email address" {...register('email', { required: 'The email field is required' })} />
            {errors.email?.message && <span className={styles.inputError}>{String(errors.email?.message)}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input type="text" placeholder="Password" {...register('password', { required: 'The password field is required' })} />
            {errors.password?.message && <span className={styles.inputError}>{String(errors.password?.message)}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="text" placeholder="Confirm Password" {...register('confirmPassword', { required: 'The confirm password field is required' })} />
            {errors.confirmPassword?.message && <span className={styles.inputError}>{String(errors.confirmPassword?.message)}</span>}
          </div>
        </div>

        <Button label="Register" variant="primary" size="large" />
      </form>
  )
}
export default RegistrationForm