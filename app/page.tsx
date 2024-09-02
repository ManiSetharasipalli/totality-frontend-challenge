'use client';

import React, { useState, useEffect } from 'react';
import { HomeIcon, BuildingOfficeIcon, GlobeAltIcon, CubeIcon, HomeModernIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline';
import PropertyList from './components/PropertyLists'; // Ensure the correct import path for PropertyList
import { properties as mockProperties } from '../tmp/MockData';

// Define property types with available Heroicons
const propertyTypes = [
  { name: "All", icon: <GlobeAltIcon className="w-6 h-6" /> },
  { name: "Apartment", icon: <BuildingOfficeIcon className="w-6 h-6" /> },
  { name: "House", icon: <HomeIcon className="w-6 h-6" /> },
  { name: "Studio", icon: <BuildingOffice2Icon className="w-6 h-6" /> },
  { name: "Loft", icon: <CubeIcon className="w-6 h-6" /> },
  { name: "Townhouse", icon: <BuildingOfficeIcon className="w-6 h-6" /> },
  { name: "Cottage", icon: <HomeIcon className="w-6 h-6" /> }, 
  { name: "Penthouse", icon: <HomeModernIcon className="w-6 h-6" /> }
];

interface Property {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  location: string;
  type: string;
}


const HomePage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('All');
  const [properties, setProperties] = useState(mockProperties);
  

  const filteredProperties = selectedType === 'All'
    ? properties
    : properties.filter(property => property.type.toLowerCase().includes(selectedType.toLowerCase()));

  return (
    <div className="container mx-auto p-8">
      {/* Centered and compact property types section */}
      <div className="flex justify-center mb-8">
        <div className="flex flex-wrap justify-center gap-4 p-20">
          {propertyTypes.map(({ name, icon }) => (
            <div
              key={name}
              onClick={() => setSelectedType(name)}
              className={`flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105 rounded-full p-2 text-sm font-medium transition-colors 
                ${selectedType === name ? 'text-blue-400' : 'text-black'} 
                hover:text-blue-400`}
            >
              {icon}
              <span className="mt-1">{name}</span>
            </div>
          ))}
        </div>
      </div>
      <PropertyList properties={filteredProperties} />
    </div>
  );
}

export default HomePage;
