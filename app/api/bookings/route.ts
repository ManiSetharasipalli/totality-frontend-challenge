import { createBooking } from '../../../fileStorage'; // Adjust the path as necessary
import { Booking } from '../../type'; // Adjust the path as necessary

// Define the type for the request body
interface CreateBookingRequest {
  propertyId: number;
  startDate: string; // Use ISO string format
  endDate: string; // Use ISO string format
  totalCost: number;
  paymentMethod: string;
}

// POST method to create a new booking
export async function POST(request: Request) {
  try {
    const body: CreateBookingRequest = await request.json();

    // Validate input data
    const { propertyId, startDate, endDate, totalCost, paymentMethod } = body;

    if (!propertyId || !startDate || !endDate || !totalCost || !paymentMethod) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
    }

    // Create a new booking record
    const newBooking: Booking = {
      id: Date.now(), // Use a timestamp or another method to generate a unique ID
      userId: 1, // Replace with actual user ID if available
      propertyId,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      totalCost,
      status: 'Success',
      paymentMethod,
    };

    const createdBooking = createBooking(newBooking);

    return new Response(JSON.stringify(createdBooking), { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
}
