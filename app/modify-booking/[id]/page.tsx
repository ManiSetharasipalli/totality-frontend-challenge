'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { properties } from '../../../data/MockData';

const ModifyBookingPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');

  // Create a mapping of propertyId to property data
  const propertyMap = new Map<number, any>(
    properties.map(property => [property.id, property])
  );

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`/api/bookings/${params.id}`);
        if (!response.ok) {
          throw new Error('Booking not found');
        }
        const data = await response.json();
        setBooking(data);
        setStartDate(data.startDate.split('T')[0]);
        setEndDate(data.endDate.split('T')[0]);
        setPaymentMethod(data.paymentMethod);

        // Calculate initial total cost
        const property = propertyMap.get(data.propertyId);
        if (property) {
          setTotalCost(calculateNumberOfDays(data.startDate, data.endDate) * property.price);
        }
      } catch (error) {
        console.error('Error fetching booking:', error);
      }
    };

    fetchBooking();
  }, [params.id]); // Only dependency is params.id

  useEffect(() => {
    if (startDate && endDate) {
      const days = calculateNumberOfDays(startDate, endDate);
      setNumberOfDays(days);
      const property = propertyMap.get(booking?.propertyId);
      if (property) {
        setTotalCost(days * property.price);
      }
    }
  }, [startDate, endDate, booking?.propertyId]); // Dependencies are startDate, endDate, and booking?.propertyId

  const calculateNumberOfDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
  };

  const handleUpdateBooking = async () => {
    if (!startDate || !endDate || !paymentMethod) {
      alert('Please fill out all required fields.');
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      alert('End date must be later than start date.');
      return;
    }

    const updatedBooking = {
      startDate,
      endDate,
      totalCost,
      paymentMethod,
    };

    try {
      const response = await fetch(`/api/bookings/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBooking),
      });

      if (!response.ok) {
        throw new Error('Failed to update booking');
      }

      const result = await response.json();
      console.log('Booking updated:', result);

      router.push('/cart');
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  if (!booking) {
    return <div className='p-32'>Loading...</div>;
  }

  const property = propertyMap.get(booking.propertyId);

  if (!property) {
    return <div className='p-32'>Property not found</div>;
  }

  return (
    <div className="container mx-auto pt-32 pb-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">Modify Your Booking</h1>
      <div className="flex flex-col items-center mb-8">
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-semibold mb-2 text-center">{property.title}</h2>
          <p className="text-gray-700 mb-2 text-center">{property.location}</p>
          <p className="text-gray-700 mb-4 text-center">Price per night: ${property.price}</p>
          <p className="text-gray-700 mb-4 text-center"><strong>Booking ID:</strong> {booking.id}</p>
        </div>
      </div>
      <form className="bg-white p-6 rounded-lg max-w-lg mx-auto shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
          <div className="flex flex-col space-y-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="PhonePay"
                checked={paymentMethod === 'PhonePay'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="form-radio"
                required
              />
              <span className="ml-2">PhonePay</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="CreditCard"
                checked={paymentMethod === 'CreditCard'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="form-radio"
                required
              />
              <span className="ml-2">Credit Card</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethod === 'PayPal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="form-radio"
                required
              />
              <span className="ml-2">PayPal</span>
            </label>
          </div>
        </div>
        <div className="mb-4 text-center">
          <p className="text-sm font-medium text-gray-700 mb-2">Number of Days: {numberOfDays}</p>
          <p className="text-sm font-medium text-gray-700 mb-2">Total Cost: ₹{totalCost}</p>
        </div>
        <button
          type="button"
          onClick={handleUpdateBooking}
          className="w-full py-3 px-4 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-green-600 transition-colors duration-200"
        >
          Update Booking
        </button>
      </form>
    </div>
  );
};

export default ModifyBookingPage;
