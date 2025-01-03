'use client'

import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { format } from 'date-fns'
import LoadingSpinner from './LoadingSpinner'

type Booking = {
  _id: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: number
}

export default function BookingList() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'))

  // Fetch bookings with useCallback for a stable function reference
  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const response = await axios.get(`http://localhost:5000/api/bookings?date=${selectedDate}`)
      setBookings(response.data)
    } catch (error) {
      setError('Failed to fetch bookings. Please try again.')
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }, [selectedDate])

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await axios.delete(`http://localhost:5000/api/bookings/${id}`)
        await fetchBookings()
      } catch (error) {
        setError('Failed to delete booking. Please try again.')
        console.error('Error deleting booking:', error)
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Bookings</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700">Select Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 border rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-8">
          <LoadingSpinner size="large" />
        </div>
      ) : bookings.length === 0 ? (
        <p className="text-center py-8 text-gray-500">No bookings found for this date.</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="border p-4 rounded shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{booking.name}</h3>
                  <p className="text-sm text-gray-600">{booking.email}</p>
                  <p className="text-sm text-gray-600">{booking.phone}</p>
                  <p className="text-sm text-gray-600">
                    {format(new Date(booking.date), 'MMM dd, yyyy')} at {booking.time}
                  </p>
                  <p className="text-sm text-gray-600">{booking.guests} guests</p>
                </div>
                <button
                  onClick={() => handleDelete(booking._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
