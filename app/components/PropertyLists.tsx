'use client';

import React from 'react';
import Link from 'next/link';

// Define TypeScript types for property
interface Property {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  location: string;
  type: string;
}

interface PropertyListProps {
  properties: Property[];
}

const PropertyList: React.FC<PropertyListProps> = ({ properties }) => {
  return (
    <div className="p-8">
      {/* Property List Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Link href={`/property_details/${property.id}`} key={property.id} passHref>
            <div
              className="flex flex-col justify-between p-4 border rounded-lg shadow-md bg-white transition-transform transform hover:scale-105 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
              style={{ height: '380px' }} // Fixed height for all cards
            >
              <img
                src={property.imageUrl}
                alt={property.title}
                className="w-full h-48 object-cover mb-4 rounded-sm"
              />
              <div className="flex flex-col flex-grow">
                <h2 className="text-sm font-semibold mb-2 truncate">{property.title}</h2> {/* Ensure title wraps */}
                <p className="text-sm font-medium text-gray-600 mb-1">₹{property.price}</p>
                <div className="flex gap-2 mb-2">
                  <p className="text-sm text-gray-500">{property.location}</p>
                  <p className="text-sm text-gray-500">{property.type}</p>
                </div>
              </div>
              {/* Buttons Section */}
              <div className="flex gap-2">
                <button className="flex-1 py-1.5 px-3 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors duration-200">
                  Add To Cart
                </button>
                <button className="flex-1 py-1.5 px-3 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors duration-200">
                  Book Now
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
