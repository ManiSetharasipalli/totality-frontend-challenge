'use client';

import { useEffect, useState } from 'react';
import { ShoppingCartIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { properties } from '../../tmp/MockData';

interface Property {
  id: number;
  title: string;
  location: string;
  imageUrl: string;
}

interface Booking {
  id: number;
  propertyId: number;
  startDate: string;
  endDate: string;
  totalCost: number;
  paymentMethod: string;
  noOfDays: number;
}

const CartPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartTotal, setCartTotal] = useState<number>(0);

  // Create a mapping of propertyId to property data
  const propertyMap = new Map<number, Property>(
    properties.map(property => [property.id, property])
  );

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/cart');
        const data = await response.json();
        
        // Ensure the data is an array
        if (Array.isArray(data)) {
          setBookings(data);
          calculateCartTotal(data);
        } else {
          console.error('Expected an array but received:', data);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const calculateCartTotal = (bookings: Booking[]) => {
    const total = bookings.reduce((acc, booking) => {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      const noOfDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));

      booking.noOfDays = noOfDays; // Update the booking with the calculated days

      return acc + Number(booking.totalCost);
    }, 0);
    
    setCartTotal(total);
  };

  const handleRemoveBooking = async (bookingId: number) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, { method: 'DELETE' });

      if (!response.ok) {
        throw new Error('Failed to remove booking');
      }

      const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
      setBookings(updatedBookings);
      calculateCartTotal(updatedBookings);
    } catch (error) {
      console.error('Error removing booking:', error);
    }
  };

  if (loading) {
    return <div className="p-32">Loading...</div>;
  }

  const TotalAmt = cartTotal;
  const formatCost = (totalCost: number) => {
    if (totalCost >= 1000000) {
      // Convert to millions and format to two decimal places
      return `₹${(totalCost / 1000000).toFixed(2)} million`;
    } else {
      return `₹${totalCost.toLocaleString()}`;
    }
  };

  const formatedAmt = formatCost(TotalAmt);

  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <XCircleIcon className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-xl font-semibold">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-32 pb-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-400 flex items-center justify-center">
        <ShoppingCartIcon className="w-8 h-8 text-blue-400 mr-2" />
        Your Cart
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => {
          const property = propertyMap.get(booking.propertyId);

          if (!property) {
            return null; // Skip if property not found
          }

          const totalCost = booking.totalCost;
          const formattedCost = formatCost(totalCost);

          return (
            <div key={booking.id} className="border p-4 rounded-lg shadow-lg flex flex-col items-center bg-white">
              <img 
                src={property.imageUrl} 
                alt={property.title} 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
              <p className="text-gray-700 mb-1">Location: {property.location}</p>
              <p className="text-gray-700 mb-1">Start Date: {new Date(booking.startDate).toLocaleDateString()}</p>
              <p className="text-gray-700 mb-1">End Date: {new Date(booking.endDate).toLocaleDateString()}</p>
              <p className="text-gray-700 mb-1">Number of Days: {booking.noOfDays}</p>
              <p className="text-gray-700 mb-1">Total Cost: {formattedCost}</p>
              <div className="mt-4 flex space-x-2">
                <a 
                  href={`/modify-booking/${booking.id}`} 
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  Modify
                </a>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                  onClick={() => handleRemoveBooking(booking.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-center mt-8">
        <h2 className="text-2xl font-bold mb-2">Cart Total: {formatedAmt}</h2>
      </div>
    </div>
  );
};

export default CartPage;
