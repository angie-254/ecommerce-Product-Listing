export interface CartItem {
    id: number;
    name: string;
    price: string;
    rating: string;
    image: string;
    quantity: number;
  }

export interface AddToCartProps {
    product: Product;
    onAddToCart: (product: Product) => void;
  }
  
  interface Product {
    id: number;
    name: string;
    price: string;
    rating: string;
    image: string;
  }