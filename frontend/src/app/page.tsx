// src/app/page.tsx
import BookingForm from '@/components/BookingForm'
import BookingList from '@/components/BookingList'
import CalendarView from '@/components/CalendarView'

export default function Home() {
  return (
    <div className="container mx-auto px-4 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
        Restaurant Booking System
      </h1>
      
      <div className="grid gap-8">
        <CalendarView />
        
        <div className="grid md:grid-cols-2 gap-8">
          <BookingForm />
          <BookingList />
        </div>
      </div>
    </div>
  )
}
