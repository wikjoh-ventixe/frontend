import { useState } from 'react'
import styles from './RegistrationForm.module.css'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import Button from '../../components/button/Button'
import { NavLink } from 'react-router-dom'

const RegistrationForm = () => {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const handleOk = () => {
    setSubmitted(false)
    reset()
  }

  const onSubmit = async (data) => {
    const res = await axios.post('RegisterApi', data, {
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
        <header className={styles.formHeader}>
          <div className={styles.logo}>
            <div className={styles.logoImage}>
              <img src="/images/logo.svg" />
            </div>
            <h1>Ventixe</h1>
          </div>

          <h2>Register</h2>
        </header>

        <div className={styles.informationBox}>
          <h2></h2>
          <p>Please check your email to verify your account.</p>
          <button className={styles.btnGreen} onClick={handleOk}>OK</button>
        </div>
      </>
    )
  }

  return (
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <header className={styles.formHeader}>
          <div className={styles.logo}>
            <div className={styles.logoImage}>
              <img src="/images/logo.svg" />
            </div>
            <h1>Ventixe</h1>
          </div>

          <h2>Register</h2>
        </header>

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

        <div className={styles.formButton}>
          <Button label="Register" variant="primary" size="large" />
        </div>

        <p className={styles.existingAccount}>Already have an account? <NavLink to="/auth/login">Login</NavLink></p>
      </form>
  )
}
export default RegistrationForm