export type PlantCategory =
  | 'fruit category'
  | 'Decorative Flowers'
  | 'Flowering Plants'
  | 'Decorative Plants'
  | 'Indoor Plants'
  | 'Vegetable Plants';

export interface Plant {
  id: string;
  name: string;
  scientificName?: string;
  description: string;
  category: PlantCategory;
  image: string;
  price: number;
  size?: string;
  sunlight?: string;
  water?: string;
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
