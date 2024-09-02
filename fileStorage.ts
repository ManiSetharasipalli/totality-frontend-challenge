import fs from 'fs';
import path from 'path';
import { Booking } from './app/type'; // Adjust the path as necessary


const dataFilePath = path.join('tmp', 'bookings.json');

console.log(`Json file path: ${dataFilePath}`);

// Ensure the 'data' directory exists
//const directoryPath = path.dirname(dataFilePath);
// if (!fs.existsSync(directoryPath)) {
//   fs.mkdirSync(directoryPath, { recursive: true });
// }

// Initialize file if it does not exist or is empty
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, JSON.stringify([]), 'utf-8');
}

// Helper function to read data from the file
export const readData = (): Booking[] => {
  try {
    const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(fileContent) as Booking[];
  } catch (error) {
    console.error('Error reading data file:', error);
    return [];
  }
};

// Helper function to write data to the file
const writeData = (data: Booking[]): void => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to data file:', error);
  }
};

// Exported functions for CRUD operations
export const getBookings = (): Booking[] => {
  return readData();
};

export const getBookingById = (id: number): Booking | undefined => {
  const bookings = readData();
  return bookings.find((booking) => booking.id === id);
};

export const createBooking = (newBooking: Booking): Booking => {
  const bookings = readData();
  bookings.push(newBooking);
  writeData(bookings);
  return newBooking;
};

export const updateBooking = (id: number, updatedBooking: Partial<Booking>): Booking | null => {
  const bookings = readData();
  const index = bookings.findIndex((booking) => booking.id === id);
  if (index !== -1) {
    bookings[index] = { ...bookings[index], ...updatedBooking } as Booking;
    writeData(bookings);
    return bookings[index];
  }
  return null;
};

export const deleteBooking = (id: number): boolean => {
  let bookings = readData();
  const index = bookings.findIndex((booking) => booking.id === id);
  if (index !== -1) {
    bookings = bookings.filter((booking) => booking.id !== id);
    writeData(bookings);
    return true;
  }
  return false;
};
