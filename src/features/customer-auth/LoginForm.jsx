import { useState } from 'react'
import styles from './LoginForm.module.css'
import { useForm } from 'react-hook-form'
import Button from '../../components/button/Button'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { loginCustomer } from '../../services/api'

const LoginForm = () => {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login } = useAuth()

  const handleOk = () => {
    setSubmitted(false)
    reset()
  }

  const onSubmit = async (data) => {
    try {
      const res = await loginCustomer(data)

      if (res.status === 200) {
        login(res.data)
        
        const returnTo = searchParams.get('returnTo')
        if (returnTo) {
          navigate(returnTo)
        } else {
          navigate('/home')
        }
        
        setSubmitted(true)
        reset()
      }
    } catch (error) {
      console.error('Login failed:', error)
    }
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

          <h2>Login</h2>
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

        </div>

        <div className={styles.formButton}>
          <Button label="Login" variant="primary" size="large" />
        </div>

        <p className={styles.noAccount}>Don't have an account? <NavLink to="/auth/register">Register</NavLink></p>
      </form>
  )
}
export default LoginForm