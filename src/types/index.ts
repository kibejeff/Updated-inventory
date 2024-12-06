export interface User {
  id: string;
  username: string;
  role: 'admin' | 'worker';
  email: string;
  profileImage?: string;
  name: string;
}

export interface Worker {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  joinDate: Date;
  status: 'active' | 'inactive';
  userId: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  imageUrl: string;
  category: string;
  price: number;
  lastUpdated: Date;
}

export interface CheckoutRecord {
  id: string;
  itemId: string;
  userId: string;
  quantity: number;
  checkoutDate: Date;
  returnDate?: Date;
  status: 'checked-out' | 'returned';
}