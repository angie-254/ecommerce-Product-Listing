'use client'
import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { CartItem } from '../lib/types';
import { PRODUCTS } from '../lib/utils';
import AddToCart from './add-to-cart';

export default function ProductList() {
  const [products] = useState(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const PRODUCTS_PER_PAGE = 10;
  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentProducts = filteredProducts.slice(
    0,
    page * PRODUCTS_PER_PAGE
  );

  const handleSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight
    ) {
      if (currentProducts.length < filteredProducts.length) {
        setLoading(true);
        setPage(prev => prev + 1);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
  
  // [currentProducts.length, filteredProducts.length]);

  const addToCart = (product: {id: number; name: string; price: string; rating: string; image: string}) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)} items)</h2>
        <p className="text-gray-600">
          Total: ${cart.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0).toFixed(2)}
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map(product => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-contain"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <div className="flex items-center mb-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="ml-1">{product.rating}</span>
              </div>
              <p className="text-xl font-bold mb-4">${product.price}</p>
              <AddToCart 
                 product={product} 
                onAddToCart={addToCart}
                 />
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="text-center py-4">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        </div>
      )}

    
      {filteredProducts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No products found matching your search.
        </div>
      )}
    </div>
  );
}