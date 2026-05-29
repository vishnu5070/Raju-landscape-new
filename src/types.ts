export interface Plant {
  id: string;
  name: string;
  scientificName?: string;
  description: string;
  category: 'Flowering Plants' | 'Decorative Plants' | 'Indoor Plants' | 'Vegetable Plants';
  image: string;
  price: number; // Price in INR
  size?: string;  // e.g., "Small", "Medium", "Large" or "6 inch pot"
  sunlight?: string; // e.g., "Full Sun", "Partial shade", "Indirect Light"
  water?: string;    // e.g., "Once a week", "Daily", "When dry"
  isFeatured?: boolean;
}

export interface CartItem {
  plant: Plant;
  quantity: number;
}

export interface OrderForm {
  name: string;
  phone: string;
  address: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
}
