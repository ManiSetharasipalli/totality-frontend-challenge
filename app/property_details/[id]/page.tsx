'use client';

import { notFound } from 'next/navigation';
import { useState, useEffect } from 'react';
import { MapPinIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { properties } from '../../../data/MockData'; // Adjust the path to your mockData file

interface PropertyDetailsProps {
  params: {
    id: string;
  };
}

interface Property {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  location: string;
  type: string;
  description: string;
  amenities: string[];
  bedrooms: number;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ params }) => {
  const { id } = params;
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = () => {
      try {
        const propertyId = parseInt(id);
        const foundProperty = properties.find((p) => p.id === propertyId);
        if (foundProperty) {
          setProperty(foundProperty);
        } else {
          throw new Error('Property not found');
        }
      } catch (error) {
        setError('Failed to load property details');
        console.error('Error fetching property details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8">{error}</div>;
  if (!property) {
    notFound();
    return null; // Return null to prevent further rendering
  }

  return (
    <div className="container mx-auto pt-32 rounded-md">
      <img src={property.imageUrl} alt={property.title} className="w-full h-96 object-cover mb-4 rounded-xl" />
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{property.title} - ₹{property.price}</h1>
      <p className="text-lg mb-4">
        <span className="font-bold text-gray-700">Description:</span> <span className="text-gray-600">{property.description}</span>
      </p>
      <div className="flex items-center mb-2 text-gray-600">
        <MapPinIcon className="h-5 w-5 mr-2 text-green-400" />
        <p className="text-lg">{property.location}</p>
      </div>
      <div className="flex items-center mb-2 text-gray-600">
        <CheckCircleIcon className="h-5 w-5 mr-2 text-green-400" />
        <p className="text-lg">Amenities: {property.amenities.join(', ')}</p>
      </div>
      <div className="flex items-center mb-2 text-gray-600">
        <p className="text-lg">Bedrooms: {property.bedrooms}</p>
      </div>

      {/* Button Section */}
      <div className="flex justify-center gap-4 my-8">
        <Link href={`/cart`}>
          <button className="py-2 px-4 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors duration-200">
            Add to Cart
          </button>
        </Link>
        <Link href={`/booking/${property.id}`}>
          <button className="py-2 px-4 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors duration-200">
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PropertyDetails;
