import { NextResponse } from 'next/server';
import { getBookingById, createBooking, updateBooking, deleteBooking } from '../../../../fileStorage';
import { Booking } from '../../../type';

// GET method to fetch a booking by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);
    const booking = getBookingById(id);
    if (booking) {
      return NextResponse.json(booking);
    } else {
      return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// POST method to create a new booking
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { propertyId, startDate, endDate, totalCost, paymentMethod } = body;

    // Create a new booking record
    const newBooking: Booking = {
      id: Date.now(),
      userId: 1,
      propertyId: parseInt(propertyId, 10),
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      totalCost: parseFloat(totalCost),
      status: 'Success',
      paymentMethod,
    };

    const createdBooking = createBooking(newBooking);
    return NextResponse.json(createdBooking, { status: 201 });
  } catch (error) {
    console.log(`Error creating booking: ${error}`);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// PUT method to update an existing booking
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);
    const body = await request.json();
    const updatedBooking = updateBooking(id, body);
    if (updatedBooking) {
      return NextResponse.json(updatedBooking);
    } else {
      return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// DELETE method to delete a booking
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);
    const success = deleteBooking(id);
    if (success) {
      return NextResponse.json({ message: 'Booking deleted' });
    } else {
      return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
