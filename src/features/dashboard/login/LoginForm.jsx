import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './LoginForm.module.css'
import { useForm } from 'react-hook-form'
import Button from '../../../components/button/Button'
import { loginUser } from '../../../services/api'

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = async (data) => {
    setIsLoading(true)
    setError('')
    
    try {
      const response = await loginUser(data)
      
      if (response.status === 200) {
        // Store admin token
        localStorage.setItem('admin_jwt_token', response.data.token)
        
        // Store additional user info if needed
        localStorage.setItem('user_id', response.data.userId)
        localStorage.setItem('user_type', response.data.userType)
        
        // Reset form and navigate to dashboard
        reset()
        navigate('/dashboard')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
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

          <h2>Dashboard</h2>
        </header>

        <div className={styles.formBody}>
          {error && <div className={styles.error}>{error}</div>}
          
          <div className={styles.formGroup}>
            <label htmlFor="email">Email address</label>
            <input 
              type="email" 
              placeholder="Email address" 
              {...register('email', { 
                required: 'The email field is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })} 
            />
            {errors.email?.message && <span className={styles.inputError}>{String(errors.email?.message)}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              placeholder="Password" 
              {...register('password', { required: 'The password field is required' })} 
            />
            {errors.password?.message && <span className={styles.inputError}>{String(errors.password?.message)}</span>}
          </div>

        </div>

        <div className={styles.formButton}>
          <Button 
            label={isLoading ? "Logging in..." : "Login"} 
            variant="primary" 
            size="large"
          />
        </div>
      </form>
  )
}
export default LoginForm