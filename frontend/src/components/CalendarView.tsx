'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns'
import axios from 'axios'
import LoadingSpinner from './LoadingSpinner'

type Booking = {
  _id: string
  date: string
  time: string
}

type TimeSlot = {
  time: string
  isBooked: boolean
}

export default function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedSlots, setSelectedSlots] = useState<TimeSlot[]>([])

  // Memoize timeSlots to prevent unnecessary recomputation
  const timeSlots = useMemo(() => [
    '12:00', '13:00', '14:00', '15:00', '16:00',
    '17:00', '18:00', '19:00', '20:00', '21:00'
  ], [])

  // Fetch bookings for the current month
  const fetchBookingsForMonth = useCallback(async () => {
    try {
      setLoading(true)
      const start = startOfMonth(selectedDate)
      const end = endOfMonth(selectedDate)
      const response = await axios.get(`http://localhost:5000/api/bookings?start=${format(start, 'yyyy-MM-dd')}&end=${format(end, 'yyyy-MM-dd')}`)
      setBookings(response.data)
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }, [selectedDate])

  useEffect(() => {
    fetchBookingsForMonth()
  }, [fetchBookingsForMonth])

  // Update the available time slots based on the selected date
  useEffect(() => {
    if (selectedDate) {
      const dayBookings = bookings.filter(booking => isSameDay(new Date(booking.date), selectedDate))
      const slots = timeSlots.map(time => ({
        time,
        isBooked: dayBookings.some(booking => booking.time === time)
      }))
      setSelectedSlots(slots)
    }
  }, [selectedDate, bookings, timeSlots]) // timeSlots is now safe to include as it's memoized

  // Get all the days in the selected month
  const getDaysInMonth = () => {
    const start = startOfMonth(selectedDate)
    const end = endOfMonth(selectedDate)
    return eachDayOfInterval({ start, end })
  }

  // Determine the CSS class for a given day
  const getDayClass = (date: Date) => {
    const baseClass = "h-10 w-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100"
    
    if (isSameDay(date, selectedDate)) {
      return `${baseClass} bg-blue-600 text-white hover:bg-blue-700`
    }
    
    if (isToday(date)) {
      return `${baseClass} border-2 border-blue-600`
    }
    
    return baseClass
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center mb-4">
          {format(selectedDate, 'MMMM yyyy')}
        </h2>
        
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {loading ? (
          <div className="py-8">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-2">
            {getDaysInMonth().map((date) => (
              <div
                key={date.toString()}
                className="aspect-square p-1"
                onClick={() => setSelectedDate(date)}
              >
                <div className={getDayClass(date)}>
                  {format(date, 'd')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">
          Available Times for {format(selectedDate, 'MMMM d, yyyy')}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {selectedSlots.map(({ time, isBooked }) => (
            <div
              key={time}
              className={`p-2 rounded text-center ${isBooked ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-green-100 text-green-700 cursor-pointer hover:bg-green-200'}`}
            >
              {time}
              {isBooked && <span className="block text-xs">Booked</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
