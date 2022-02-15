import bcrypt from 'bcryptjs';
const data = {
  users: [
    {
      name: 'Drey',
      email: 'admin@example.com',
      password: bcrypt.hashSync('3739', 8),
      isAdmin: true,
    },
    {
      name: 'Ovie',
      email: 'user@example.com',
      password: bcrypt.hashSync('6843', 8),
      isAdmin: false,
    }
  ],
  products: [
    {
      name: 'Flower Dress',
      category: 'Dresses',
      image: '/images/1.jpg',
      price: 13500,
      countInStock: 10,
      brand: 'Ovie',
      rating: 3.5,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      name: 'White Dress',
      category: 'Dresses',
      image: '/images/2.jpg',
      price: 30000,
      countInStock: 13,
      brand: 'Ovie',
      rating: 4.5,
      numReviews: 15,
      description: 'high quality product',
    },
    {
      name: 'Flower Red Dress',
      category: 'Dresses',
      image: '/images/3.jpg',
      price: 10000,
      countInStock: 8,
      brand: 'Ovie',
      rating: 4.0,
      numReviews: 12,
      description: 'high quality product',
    },
    {
      name: 'Blue Dress',
      category: 'Dresses',
      image: '/images/4.jpg',
      price: 25000,
      countInStock: 25,
      brand: 'Ovie',
      rating: 5.0,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      name: 'Green Dress',
      category: 'Dresses',
      image: '/images/5.jpg',
      price: 15000,
      countInStock: 0,
      brand: 'Ovie',
      rating: 3.0,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      name: 'Peach Dress',
      category: 'Dresses',
      image: '/images/6.jpg',
      price: 10000,
      countInStock: 23,
      brand: 'Ovie',
      rating: 3.5,
      numReviews: 10,
      description: 'high quality product',
    }
  ]
};


export default data;
