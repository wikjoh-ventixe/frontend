import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import styles from './DashboardEventManagement.module.css'
import Button from '../../components/button/Button'
import { getEvent, getPackagesByEventId, createPackage, updatePackage, deletePackage, updateEvent } from '../../services/api'
import { Trash2, Edit, Plus } from 'lucide-react'

const DashboardEventManagement = () => {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showPackageForm, setShowPackageForm] = useState(false)
  const [editingPackage, setEditingPackage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showEventForm, setShowEventForm] = useState(false)
  const [isUpdatingEvent, setIsUpdatingEvent] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm()
  const { register: registerEvent, handleSubmit: handleSubmitEvent, formState: { errors: eventErrors }, reset: resetEvent, setValue: setEventValue } = useForm()

  const fetchEventData = async () => {
    try {
      const [eventResponse, packagesResponse] = await Promise.all([
        getEvent(eventId),
        getPackagesByEventId(eventId)
      ])
      
      setEvent(eventResponse.data)
      setPackages(packagesResponse.data)
    } catch (error) {
      console.error('Error fetching event data:', error)
      setError('Failed to load event data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (eventId) {
      fetchEventData()
    }
  }, [eventId])

  const handleCreatePackage = () => {
    setEditingPackage(null)
    setShowPackageForm(true)
    reset()
  }

  const handleEditPackage = (pkg) => {
    setEditingPackage(pkg)
    setShowPackageForm(true)
    setValue('title', pkg.title)
    setValue('seatingArrangement', pkg.seatingArrangement)
    setValue('placement', pkg.placement)
    setValue('price', pkg.price)
    setValue('currency', pkg.currency)
  }

  const handleDeletePackage = async (packageId) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        await deletePackage(packageId)
        setPackages(packages.filter(pkg => pkg.id !== packageId))
      } catch (error) {
        console.error('Error deleting package:', error)
        setError('Failed to delete package')
      }
    }
  }

  const onSubmitPackage = async (data) => {
    setIsSubmitting(true)
    setError('')

    try {
      if (editingPackage) {
        // Update existing package
        const packageData = {
          id: editingPackage.id,
          title: data.title,
          seatingArrangement: data.seatingArrangement,
          placement: data.placement,
          price: parseFloat(data.price),
          currency: data.currency
        }
        
        const response = await updatePackage(packageData)
        setPackages(packages.map(pkg => 
          pkg.id === editingPackage.id ? response.data : pkg
        ))
      } else {
        // Create new package
        const packageData = {
          eventId: eventId,
          title: data.title,
          seatingArrangement: data.seatingArrangement,
          placement: data.placement,
          price: parseFloat(data.price),
          currency: data.currency
        }
        
        const response = await createPackage(packageData)
        setPackages([...packages, response.data])
      }
      
      setShowPackageForm(false)
      setEditingPackage(null)
      reset()
    } catch (error) {
      console.error('Error saving package:', error)
      setError('Failed to save package')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setShowPackageForm(false)
    setEditingPackage(null)
    reset()
  }

  const handleBackToEvents = () => {
    navigate('/dashboard/events')
  }

  const handleEditEvent = () => {
    setShowEventForm(true)
    // Pre-populate form with current event data
    setEventValue('title', event.title)
    setEventValue('description', event.description)
    setEventValue('image', event.image)
    setEventValue('location', event.location)
    setEventValue('category', event.category)
    setEventValue('maxBookings', event.maxBookings)
    setEventValue('active', event.active)
    // Format date for datetime-local input
    const eventDate = new Date(event.eventDate)
    const formattedDate = eventDate.toISOString().slice(0, 16)
    setEventValue('eventDate', formattedDate)
  }

  const onSubmitEvent = async (data) => {
    setIsUpdatingEvent(true)
    setError('')

    try {
      const eventData = {
        id: event.id,
        image: data.image,
        title: data.title,
        eventDate: new Date(data.eventDate).toISOString(),
        location: data.location,
        description: data.description,
        category: data.category,
        active: data.active || false,
        maxBookings: parseInt(data.maxBookings, 10)
      }

      const response = await updateEvent(eventData)
      setEvent(response.data)
      setShowEventForm(false)
      resetEvent()
    } catch (error) {
      console.error('Error updating event:', error)
      setError('Failed to update event')
    } finally {
      setIsUpdatingEvent(false)
    }
  }

  const handleCancelEventEdit = () => {
    setShowEventForm(false)
    resetEvent()
  }

  if (loading) {
    return <div className={styles.loading}>Loading event data...</div>
  }

  if (!event) {
    return <div className={styles.error}>Event not found</div>
  }

  return (
    <div className={styles.eventManagementContainer}>
      <div className={styles.header}>
        <div>
          <button className={styles.backButton} onClick={handleBackToEvents}>
            ← Back to Events
          </button>
          <div className={styles.eventOverview}>
            <div className={styles.eventImageContainer}>
              <img src={event.image} alt={event.title} className={styles.eventImage} />
            </div>
            <div className={styles.eventInfo}>
              <div className={styles.eventTitleContainer}>
                <h2>{event.title}</h2>
                <button className={styles.editEventButton} onClick={handleEditEvent} title="Edit event">
                  <Edit size={16} />
                  <span>Edit Event</span>
                </button>
              </div>
              <p className={styles.eventDetails}>
                {new Date(event.eventDate).toLocaleDateString()} • {event.location} • {event.category}
              </p>
              <div className={styles.eventMeta}>
                <span className={styles.statusBadge}>
                  {event.active ? 'Active' : 'Inactive'}
                </span>
                <span className={styles.maxBookings}>
                  Max Bookings: {event.maxBookings}
                </span>
              </div>
              <div className={styles.eventDescription}>
                <h4>Description</h4>
                <p>{event.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.packagesSection}>
        <div className={styles.packagesHeader}>
          <h3>Event Packages</h3>
          <div onClick={handleCreatePackage}>
            <Button 
              label="Add Package" 
              variant="primary" 
              size="medium" 
              withIcon={true}
            />
          </div>
        </div>

        {packages.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No packages created yet. Create your first package to get started.</p>
          </div>
        ) : (
          <div className={styles.packagesGrid}>
            {packages.map(pkg => (
              <div key={pkg.id} className={styles.packageCard}>
                <div className={styles.packageHeader}>
                  <h4>{pkg.title}</h4>
                  <div className={styles.packageActions}>
                    <button 
                      className={styles.actionButton} 
                      onClick={() => handleEditPackage(pkg)}
                      title="Edit package"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className={styles.actionButton} 
                      onClick={() => handleDeletePackage(pkg.id)}
                      title="Delete package"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className={styles.packageDetails}>
                  <p><strong>Seating:</strong> {pkg.seatingArrangement}</p>
                  <p><strong>Placement:</strong> {pkg.placement}</p>
                  <p className={styles.price}>{pkg.price} {pkg.currency}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showEventForm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Edit Event</h3>
            
            <form onSubmit={handleSubmitEvent(onSubmitEvent)} noValidate>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Event Title *</label>
                  <input 
                    type="text" 
                    placeholder="Enter event title" 
                    {...registerEvent('title', { required: 'Event title is required' })} 
                  />
                  {eventErrors.title?.message && <span className={styles.inputError}>{String(eventErrors.title?.message)}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label>Category *</label>
                  <select {...registerEvent('category', { required: 'Category is required' })}>
                    <option value="">Select category</option>
                    <option value="Music">Music</option>
                    <option value="Sports">Sports</option>
                    <option value="Arts">Arts</option>
                    <option value="Business">Business</option>
                    <option value="Education">Education</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Other">Other</option>
                  </select>
                  {eventErrors.category?.message && <span className={styles.inputError}>{String(eventErrors.category?.message)}</span>}
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Event Date *</label>
                  <input 
                    type="datetime-local" 
                    {...registerEvent('eventDate', { required: 'Event date is required' })} 
                  />
                  {eventErrors.eventDate?.message && <span className={styles.inputError}>{String(eventErrors.eventDate?.message)}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label>Location *</label>
                  <input 
                    type="text" 
                    placeholder="Enter event location" 
                    {...registerEvent('location', { required: 'Location is required' })} 
                  />
                  {eventErrors.location?.message && <span className={styles.inputError}>{String(eventErrors.location?.message)}</span>}
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Image URL *</label>
                  <input 
                    type="url" 
                    placeholder="https://example.com/image.jpg" 
                    {...registerEvent('image', { 
                      required: 'Image URL is required',
                      pattern: {
                        value: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i,
                        message: 'Please enter a valid image URL'
                      }
                    })} 
                  />
                  {eventErrors.image?.message && <span className={styles.inputError}>{String(eventErrors.image?.message)}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label>Max Bookings *</label>
                  <input 
                    type="number" 
                    min="1"
                    placeholder="Enter maximum bookings" 
                    {...registerEvent('maxBookings', { 
                      required: 'Max bookings is required',
                      min: { value: 1, message: 'Max bookings must be at least 1' }
                    })} 
                  />
                  {eventErrors.maxBookings?.message && <span className={styles.inputError}>{String(eventErrors.maxBookings?.message)}</span>}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Description *</label>
                <textarea 
                  placeholder="Enter event description" 
                  rows={4}
                  {...registerEvent('description', { required: 'Description is required' })} 
                />
                {eventErrors.description?.message && <span className={styles.inputError}>{String(eventErrors.description?.message)}</span>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    {...registerEvent('active')} 
                  />
                  <span>Active Event</span>
                </label>
              </div>

              <div className={styles.modalActions}>
                <div onClick={handleCancelEventEdit}>
                  <Button 
                    label="Cancel" 
                    variant="primary" 
                    size="medium"
                  />
                </div>
                <div>
                  <Button 
                    label={isUpdatingEvent ? "Updating..." : "Update Event"} 
                    variant="primary" 
                    size="medium"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPackageForm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>{editingPackage ? 'Edit Package' : 'Create New Package'}</h3>
            
            <form onSubmit={handleSubmit(onSubmitPackage)} noValidate>
              <div className={styles.formGroup}>
                <label>Package Title *</label>
                <input 
                  type="text" 
                  placeholder="Enter package title" 
                  {...register('title', { required: 'Package title is required' })} 
                />
                {errors.title?.message && <span className={styles.inputError}>{String(errors.title?.message)}</span>}
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Seating Arrangement *</label>
                  <input 
                    type="text" 
                    placeholder="e.g., VIP, General, Balcony" 
                    {...register('seatingArrangement', { required: 'Seating arrangement is required' })} 
                  />
                  {errors.seatingArrangement?.message && <span className={styles.inputError}>{String(errors.seatingArrangement?.message)}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label>Placement *</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Front Row, Center, Back" 
                    {...register('placement', { required: 'Placement is required' })} 
                  />
                  {errors.placement?.message && <span className={styles.inputError}>{String(errors.placement?.message)}</span>}
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Price *</label>
                  <input 
                    type="number" 
                    step="0.01"
                    min="0"
                    placeholder="Enter price" 
                    {...register('price', { 
                      required: 'Price is required',
                      min: { value: 0, message: 'Price must be positive' }
                    })} 
                  />
                  {errors.price?.message && <span className={styles.inputError}>{String(errors.price?.message)}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label>Currency *</label>
                  <select {...register('currency', { required: 'Currency is required' })}>
                    <option value="">Select currency</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="SEK">SEK</option>
                  </select>
                  {errors.currency?.message && <span className={styles.inputError}>{String(errors.currency?.message)}</span>}
                </div>
              </div>

              <div className={styles.modalActions}>
                <div onClick={handleCancel}>
                  <Button 
                    label="Cancel" 
                    variant="primary" 
                    size="medium"
                  />
                </div>
                <div>
                  <Button 
                    label={isSubmitting ? "Saving..." : (editingPackage ? "Update Package" : "Create Package")} 
                    variant="primary" 
                    size="medium"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardEventManagement 