'use client'
import { useState } from 'react';
import { AddToCartProps } from '../lib/types';

export default function AddToCart({ product, onAddToCart } : AddToCartProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(product);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`w-full py-2 rounded-lg transition-colors ${
        isAdding 
        ? 'bg-green-500 text-white' 
        : 'bg-blue-600 hover:bg-blue-700 text-white'
      }`}
    >
      {isAdding ? 'Added!' : 'Add to Cart'}
    </button>
  );
}