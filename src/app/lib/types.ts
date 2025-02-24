export interface CartItem {
    id: number;
    name: string;
    price: string;
    rating: string;
    image: string;
    quantity: number;
  }

export interface AddToCartProps {
    product: any;
    onAddToCart: (product: any) => void;
  }
  