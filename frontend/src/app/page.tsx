// src/app/page.tsx
import BookingForm from '@/components/BookingForm'
import BookingList from '@/components/BookingList'

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Restaurant Booking System
      </h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <BookingForm />
        <BookingList />
      </div>
    </div>
  )
}