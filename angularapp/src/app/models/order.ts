export interface Order {
    date: string;
    total: number;
    resume: string;
    user: {
      userId: number;
      userName: string;
    };
    tickets: {
      offerId: number;
      type: string;
      quantity: number;
      price: number;
    }[];
  }
  