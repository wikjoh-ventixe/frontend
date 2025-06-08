import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import styles from './DashboardCreateEvent.module.css'
import Button from '../../components/button/Button'
import { createEvent } from '../../services/api'

const DashboardCreateEvent = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = async (data) => {
    setIsLoading(true)
    setError('')
    
    try {
      // Format the data according to API requirements
      const eventData = {
        image: data.image,
        title: data.title,
        eventDate: new Date(data.eventDate).toISOString(),
        location: data.location,
        description: data.description,
        category: data.category,
        active: data.active || true,
        maxBookings: parseInt(data.maxBookings, 10)
      }
      
      const response = await createEvent(eventData)
      
      if (response.status === 200 || response.status === 201) {
        // Navigate to the event management page with the created event ID
        const eventId = response.data.id || response.data.eventId || response.data.Id
        navigate(`/dashboard/events/${eventId}`)
      }
    } catch (err) {
      console.error('Create event error:', err)
      setError(err.response?.data?.message || 'Failed to create event. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/dashboard/events')
  }

  return (
    <div className={styles.createEventContainer}>
      <div className={styles.header}>
        <h2>Create New Event</h2>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        {error && <div className={styles.error}>{error}</div>}
        
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Event Title *</label>
            <input 
              type="text" 
              placeholder="Enter event title" 
              {...register('title', { required: 'Event title is required' })} 
            />
            {errors.title?.message && <span className={styles.inputError}>{String(errors.title?.message)}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category">Category *</label>
            <select 
              {...register('category', { required: 'Category is required' })}
            >
              <option value="">Select category</option>
              <option value="Music">Music</option>
              <option value="Sports">Sports</option>
              <option value="Arts">Arts</option>
              <option value="Business">Business</option>
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
            {errors.category?.message && <span className={styles.inputError}>{String(errors.category?.message)}</span>}
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="eventDate">Event Date *</label>
            <input 
              type="datetime-local" 
              {...register('eventDate', { required: 'Event date is required' })} 
            />
            {errors.eventDate?.message && <span className={styles.inputError}>{String(errors.eventDate?.message)}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="location">Location *</label>
            <input 
              type="text" 
              placeholder="Enter event location" 
              {...register('location', { required: 'Location is required' })} 
            />
            {errors.location?.message && <span className={styles.inputError}>{String(errors.location?.message)}</span>}
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="image">Image URL *</label>
            <input 
              type="url" 
              placeholder="https://example.com/image.jpg" 
              {...register('image', { 
                required: 'Image URL is required',
                pattern: {
                  value: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i,
                  message: 'Please enter a valid image URL'
                }
              })} 
            />
            {errors.image?.message && <span className={styles.inputError}>{String(errors.image?.message)}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="maxBookings">Max Bookings *</label>
            <input 
              type="number" 
              min="1"
              placeholder="Enter maximum bookings" 
              {...register('maxBookings', { 
                required: 'Max bookings is required',
                min: { value: 1, message: 'Max bookings must be at least 1' }
              })} 
            />
            {errors.maxBookings?.message && <span className={styles.inputError}>{String(errors.maxBookings?.message)}</span>}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description *</label>
          <textarea 
            placeholder="Enter event description" 
            rows={4}
            {...register('description', { required: 'Description is required' })} 
          />
          {errors.description?.message && <span className={styles.inputError}>{String(errors.description?.message)}</span>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.checkboxLabel}>
            <input 
              type="checkbox" 
              defaultChecked={true}
              {...register('active')} 
            />
            <span>Active Event</span>
          </label>
        </div>

        <div className={styles.formActions}>
          <div onClick={handleCancel}>
            <Button 
              label="Cancel" 
              variant="primary" 
              size="medium"
            />
          </div>
          <div>
            <Button 
              label={isLoading ? "Creating..." : "Create Event"} 
              variant="primary" 
              size="medium"
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default DashboardCreateEvent 