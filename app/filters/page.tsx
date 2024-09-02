'use client';

import React, { useState, useEffect } from 'react';
import PropertieList from '../components/PropertyLists'; // Ensure this import path is correct
import { properties } from '../../data/MockData'; // Adjust the path to your mockData file
import { XCircleIcon } from '@heroicons/react/24/outline'; // Import a Heroicons icon

// Utility function for sorting
const sortProperties = (properties: Property[], sortBy: string) => {
  switch (sortBy) {
    case 'price-asc':
      return [...properties].sort((a, b) => a.price - b.price);
    case 'price-desc':
      return [...properties].sort((a, b) => b.price - a.price);
    default:
      return properties;
  }
};

// TypeScript type for properties
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

const FiltersPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [bedroomRange, setBedroomRange] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [amenities, setAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('none');
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Use mock data directly
      setFilteredProperties(properties);
    } catch (error) {
      setError('Failed to load properties');
      console.error('Error loading properties:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8">{error}</div>;

  // Filter properties based on selected filters
  const filteredAndSortedProperties = sortProperties(
    filteredProperties.filter(property => {
      const matchesSearch = property.location.toLowerCase().includes(search.toLowerCase());
      const matchesBedrooms = bedroomRange === 'all' || 
      (bedroomRange === '4+' ? property.bedrooms >= 4 : 
      (property.bedrooms >= parseInt(bedroomRange.split('-')[0]) && property.bedrooms <= parseInt(bedroomRange.split('-')[1])));
      
      // Handle price range
      let matchesPrice = false;
      if (priceRange === 'all') {
        matchesPrice = true;
      } else if (priceRange.includes('+')) {
        // Handle the case for "300+"
        const minPrice = parseInt(priceRange.replace('+', ''));
        matchesPrice = property.price >= minPrice;
      } else {
        // Handle the range cases like "0-100"
        const [minPrice, maxPrice] = priceRange.split('-').map(Number);
        matchesPrice = property.price >= minPrice && property.price <= maxPrice;
      }
  
      const matchesAmenities = amenities.length === 0 || amenities.every(amenity => property.amenities.includes(amenity));
  
      return matchesSearch && matchesBedrooms && matchesPrice && matchesAmenities;
    }),
    sortBy
  );

  return (
    <div className="container mx-auto pt-32">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4">
          <div className="p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            
            {/* Search Bar */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by Location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-2 border focus:outline-none rounded-lg"
              />
            </div>

            {/* Bedroom Range */}
            <div className="mb-4">
              <h3 className="text-md font-semibold mb-2">Bedrooms</h3>
              <select
                value={bedroomRange}
                onChange={(e) => setBedroomRange(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="all">All</option>
                <option value="1-2">1-2</option>
                <option value="2-3">2-3</option>
                <option value="3-4">3-4</option>
                <option value="4+">4+</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-4">
              <h3 className="text-md font-semibold mb-2">Price Range</h3>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="all">All</option>
                <option value="0-10000">₹0 - ₹10000</option>
                <option value="10000-20000">₹10000 - ₹20000</option>
                <option value="20000-30000">₹20000 - ₹30000</option>
                <option value="30000+">₹30000+</option>
              </select>
            </div>

            {/* Amenities */}
            <div className="mb-4">
              <h3 className="text-md font-semibold mb-2">Amenities</h3>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="WiFi"
                    checked={amenities.includes('WiFi')}
                    onChange={(e) => setAmenities(prev => e.target.checked ? [...prev, 'WiFi'] : prev.filter(amenity => amenity !== 'WiFi'))}
                    className="form-checkbox"
                  />
                  <span>WiFi</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="Hot Tub"
                    checked={amenities.includes('Hot Tub')}
                    onChange={(e) => setAmenities(prev => e.target.checked ? [...prev, 'Hot Tub'] : prev.filter(amenity => amenity !== 'Hot Tub'))}
                    className="form-checkbox"
                  />
                  <span>Hot Tub</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="Pet Friendly"
                    checked={amenities.includes('Pet Friendly')}
                    onChange={(e) => setAmenities(prev => e.target.checked ? [...prev, 'Pet Friendly'] : prev.filter(amenity => amenity !== 'Pet Friendly'))}
                    className="form-checkbox"
                  />
                  <span>Pet Friendly</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="Pool"
                    checked={amenities.includes('Pool')}
                    onChange={(e) => setAmenities(prev => e.target.checked ? [...prev, 'Pool'] : prev.filter(amenity => amenity !== 'Pool'))}
                    className="form-checkbox"
                  />
                  <span>Pool</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="Barbecue"
                    checked={amenities.includes('Barbecue')}
                    onChange={(e) => setAmenities(prev => e.target.checked ? [...prev, 'Barbecue'] : prev.filter(amenity => amenity !== 'Barbecue'))}
                    className="form-checkbox"
                  />
                  <span>Barbecue</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="Fishing"
                    checked={amenities.includes('Fishing')}
                    onChange={(e) => setAmenities(prev => e.target.checked ? [...prev, 'Fishing'] : prev.filter(amenity => amenity !== 'Fishing'))}
                    className="form-checkbox"
                  />
                  <span>Fishing</span>
                </label>
              </div>
            </div>

            {/* Sort By */}
            <div className="mb-4">
              <h3 className="text-md font-semibold mb-2">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="none">None</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Properties List Section */}
        <div className="w-full lg:w-3/4">
          {filteredAndSortedProperties.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64">
              <XCircleIcon className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg font-semibold">No Properties Found</p>
            </div>
          ) : (
            <PropertieList properties={filteredAndSortedProperties} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FiltersPage;
