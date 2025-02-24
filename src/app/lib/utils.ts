export const PRODUCT_IMAGES = [
    '../assets/ecommerce-blouse.jpg',
    '../assets/ecommerce-dress.jpg',
    '../assets/ecommerce-shirt.jpg',
    '../assets/ecommerce-pants.jpg',
    '../assets/ecommerce-shoes.jpg',
    '../assets/ecommerce-heels.jpg',
    '../assets/ecommerce-glasses.jpg'
]

export const PRODUCTS = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: ((i % 20) + 30).toFixed(2),
  rating: ((i % 10) / 2 + 3).toFixed(1),
  image: PRODUCT_IMAGES[i % PRODUCT_IMAGES.length]
}));
