import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET method to retrieve a booking by ID
export async function GET(request: Request) {


  try {
    const booking = await prisma.booking.findMany();

    if (!booking) {
      return new Response(JSON.stringify({ message: 'Booking not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(booking), { status: 200 });
  } catch (error) {
    console.error('Error fetching booking:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
}