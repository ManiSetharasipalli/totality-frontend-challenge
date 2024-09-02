export interface Booking {
    id: number;
    userId: number;
    propertyId: number;
    startDate: string; 
    endDate: string;   
    totalCost: number;
    status: string;
    paymentMethod: string;
  }
  