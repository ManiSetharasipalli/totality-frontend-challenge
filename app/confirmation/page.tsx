'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {properties} from '../data/MockData'

const ConfirmationPage = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  


  useEffect(() => {
    if (bookingId) {
      const fetchBooking = async () => {
        try {
          const response = await fetch(`/api/bookings/${bookingId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch booking');
          }
          const data = await response.json();
          setBooking(data);
        } catch (error) {
          console.error('Error fetching booking:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchBooking();
    }
  }, [bookingId]);

  if (loading) {
    return <div className="p-32">Loading...</div>;
  }

  if (!booking) {
    return <div className="p-32">Booking not found</div>;
  }

  const propertyId = booking.propertyId;
  const property = properties.find(prop => prop.id === propertyId);

  const calculateNumberOfDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
  };

  const numberOfDays = calculateNumberOfDays(booking.startDate, booking.endDate);

  return (
    <div className="container mx-auto pt-32 pb-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">Booking Confirmation</h1>
      <div className="flex flex-col items-center mb-8">
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-semibold mb-2 text-center">Booking ID: {booking.id}</h2>
          <p className="text-gray-700 mb-2 text-center">Property: {property.title}</p>
          <p className="text-gray-700 mb-2 text-center">Location: {property.location}</p>
          <p className="text-gray-700 mb-2 text-center">Start Date: {new Date(booking.startDate).toLocaleDateString()}</p>
          <p className="text-gray-700 mb-2 text-center">End Date: {new Date(booking.endDate).toLocaleDateString()}</p>
          <p className="text-gray-700 mb-2 text-center">Number of Days: {numberOfDays}</p>
          <p className="text-gray-700 mb-2 text-center">Total Cost: ₹{booking.totalCost}</p>
          <p className="text-gray-700 mb-2 text-center">Payment Method: {booking.paymentMethod}</p>
        </div>
      </div>
      <div className="text-center">
        <p className="text-lg font-semibold">Thank you for your booking!</p>
      </div>
    </div>
  );
};

export default ConfirmationPage;
