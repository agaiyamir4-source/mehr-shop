export interface Review {
  id: string;
  username: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
}

export interface Specification {
  key: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  englishTitle: string;
  price: number;
  discountPercentage: number;
  rating: number;
  ratingCount: number;
  stock: number;
  category: string;
  brand: string;
  images: string[];
  specifications: Specification[];
  description: string;
  isSpecialOffer?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber?: string;
  address?: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  totalPrice: number;
  shippingAddress: string;
  deliveryMethod: string;
  paymentMethod: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  discountApplied: number;
}

export interface Coupon {
  code: string;
  discountPercent: number;
}

export interface NotificationMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
