'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {properties} from '../../../data/MockData'

const BookingPage = ({ params }: { params: { propertyId: string } }) => {
  const router = useRouter();
  const [property, setProperty] = useState<any>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    const fetchProperty = () => {
      const propertyId = parseInt(params.propertyId);
      const propertyData = properties.find(prop => prop.id === propertyId);
      if (propertyData) {
        setProperty(propertyData);
        setTotalCost(propertyData.price); // Initialize total cost
        setStartDate(new Date().toISOString().split('T')[0]); // Set start date to today
      } else {
        console.error('Property not found');
      }
    };

    fetchProperty();
  }, [params.propertyId]);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
      setNumberOfDays(days);
      setTotalCost(days * (property?.price || 0));
    }
  }, [startDate, endDate, property?.price]);

  const handleConfirmBooking = async () => {
    if (!startDate || !endDate || !guestName || !email || !paymentMethod) {
      alert('Please fill out all required fields.');
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      alert('End date must be later than start date.');
      return;
    }

    const booking = {
      propertyId: property?.id,
      userId: 1, 
      startDate,
      endDate,
      totalCost,
      paymentMethod,
    };

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      const result = await response.json();
      console.log('Booking created:', result);

      router.push(`/confirmation?bookingId=${result.id}`);
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  if (!property) {
    return <div className='p-32'>Loading...</div>;
  }

  return (
    <div className="container mx-auto pt-32 pb-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">Confirm Your Booking</h1>
      <div className="flex flex-col items-center mb-8">
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-semibold mb-2 text-center">{property.title}</h2>
          <p className="text-gray-700 mb-2 text-center">{property.location}</p>
          <p className="text-gray-700 mb-4 text-center">Price per night: ${property.price}</p>
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Guest Name</label>
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
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
          <p className="text-sm font-medium text-gray-700 mb-2">Total Cost: ${totalCost}</p>
        </div>
        <Link href={`/booking/${property.id}`}>
          <button
            type="button"
            onClick={handleConfirmBooking}
            className="w-full py-3 px-4 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            Confirm Booking
          </button>
        </Link>
      </form>
    </div>
  );
};

export default BookingPage;
