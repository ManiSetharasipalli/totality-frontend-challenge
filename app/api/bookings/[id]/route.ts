import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET method to retrieve a booking by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    return new Response(JSON.stringify({ message: 'Invalid booking ID' }), { status: 400 });
  }

  try {
    const booking = await prisma.booking.findUnique({
      where: { id: id }
    });

    if (!booking) {
      return new Response(JSON.stringify({ message: 'Booking not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(booking), { status: 200 });
  } catch (error) {
    console.error('Error fetching booking:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
}

// PATCH method to update booking details
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    return new Response(JSON.stringify({ message: 'Invalid booking ID' }), { status: 400 });
  }

  try {
    const body = await request.json();
    const { startDate, endDate, totalCost, paymentMethod } = body;

    // Validate input data
    if (!startDate || !endDate || !totalCost || !paymentMethod) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
    }

    // Update booking record
    const updatedBooking = await prisma.booking.update({
      where: { id: id },
      data: {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalCost: parseFloat(totalCost),
        paymentMethod,
      },
    });

    return new Response(JSON.stringify(updatedBooking), { status: 200 });
  } catch (error) {
    console.error('Error updating booking:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
}


// DELETE method to remove a booking by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    return new Response(JSON.stringify({ message: 'Invalid booking ID' }), { status: 400 });
  }

  try {
    // Check if booking exists
    const existingBooking = await prisma.booking.findUnique({
      where: { id: id },
    });

    if (!existingBooking) {
      return new Response(JSON.stringify({ message: 'Booking not found' }), { status: 404 });
    }

    // Delete the booking
    await prisma.booking.delete({
      where: { id: id },
    });

    return new Response(JSON.stringify({ message: 'Booking deleted successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
}

