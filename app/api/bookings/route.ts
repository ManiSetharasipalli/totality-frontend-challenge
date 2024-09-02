import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST method to create a new booking
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {  propertyId, startDate, endDate, totalCost, paymentMethod } = body;


    // Create a new booking record
    const newBooking = await prisma.booking.create({
      data: {
        userId: 1,
        propertyId: parseInt(propertyId, 10),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalCost: parseFloat(totalCost),
        status:'Success',
        paymentMethod,
      },
    });

    return new Response(JSON.stringify(newBooking), { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
}
