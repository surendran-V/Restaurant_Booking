// src/components/BookingForm.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { format } from 'date-fns'

type FormData = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  date: yup.string().required('Date is required'),
  time: yup.string().required('Time is required'),
  guests: yup.number().min(1).max(10).required('Number of guests is required')
})

const timeSlots = [
  '12:00', '13:00', '14:00', '15:00', '16:00', 
  '17:00', '18:00', '19:00', '20:00', '21:00'
]

export default function BookingForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)
      setError('')
      await axios.post('http://localhost:5000/api/bookings', {
        ...data,
        date: format(new Date(data.date), 'yyyy-MM-dd')
      })
      
      setSuccess(true)
      reset()
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
        if (axios.isAxiosError(err)){
      setError(err.response?.data?.message || 'An error occurred')}
      else{
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Book a Table</h2>
      
      {success && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
          Booking successful! We look forward to serving you.
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            {...register('name')}
            className="w-full p-2 border rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="tel"
            {...register('phone')}
            className="w-full p-2 border rounded"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            {...register('date')}
            min={format(new Date(), 'yyyy-MM-dd')}
            className="w-full p-2 border rounded"
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Time</label>
          <select
            {...register('time')}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a time</option>
            {timeSlots.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
          {errors.time && (
            <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Number of Guests</label>
          <input
            type="number"
            {...register('guests')}
            min="1"
            max="10"
            className="w-full p-2 border rounded"
          />
          {errors.guests && (
            <p className="text-red-500 text-sm mt-1">{errors.guests.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? 'Booking...' : 'Book Table'}
        </button>
      </form>
    </div>
  )
}