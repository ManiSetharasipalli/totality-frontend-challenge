import { readData } from '../../../fileStorage'; // Adjust the path as necessary

// GET method to retrieve all bookings
export async function GET(request: Request) {
  try {
    // Retrieve all bookings from the file
    const bookings = readData();

    if (bookings.length === 0) {
      return new Response(JSON.stringify({ message: 'No bookings found' }), { status: 404 });
    }

    return new Response(JSON.stringify(bookings), { status: 200 });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
}
