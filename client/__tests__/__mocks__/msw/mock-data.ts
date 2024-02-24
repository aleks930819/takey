import { Restaurant } from '@/interfaces/restaurants';
import { Cuisine } from '@/interfaces/cuisines';

export const mockRestaraunts: Restaurant[] = [
  {
    categories: ['1', '2'],
    _id: '1',
    name: 'Restaurant 1',
    location: {
      type: 'Point',
      coordinates: [1, 1],
    },
    deliveryTime: '30 min',
    minOrderPrice: 10,
    image:
      'https://images.unsplash.com/photo-1531917115039-473b5a388f40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    isClosed: false,
    isOpen: true,
    avgPrice: 20,
    openingHours: [
      {
        day: 'Monday',
        open: '8:00',
        close: '22:00',
      },
      {
        day: 'Tuesday',
        open: '8:00',
        close: '22:00',
      },
      {
        day: 'Wednesday',
        open: '8:00',
        close: '22:00',
      },
      {
        day: 'Thursday',
        open: '8:00',
        close: '22:00',
      },
      {
        day: 'Friday',
        open: '8:00',
        close: '22:00',
      },
      {
        day: 'Saturday',
        open: '8:00',
        close: '22:00',
      },
      {
        day: 'Sunday',
        open: '8:00',
        close: '22:00',
      },
    ],
    rating: 4.5,
    ratingsQuantity: 100,
    ratingsAverage: 4.5,
    city: 'New York',
    cuisine: 'Italian',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    categories: ['1', '2'],

    _id: '2',
    name: 'Restaurant 2',
    location: {
      type: 'Point',
      coordinates: [1, 1],
    },
    deliveryTime: '20',
    minOrderPrice: 10,
    image:
      'https://images.unsplash.com/photo-1531917115039-473b5a388f40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    isClosed: true,
    isOpen: false,
    avgPrice: 15,
    openingHours: [
      {
        day: 'Monday',
        open: '8:00',
        close: '22:00',
      },
      {
        day: 'Tuesday',
        open: '8:00',
        close: '22:00',
      },
      {
        day: 'Wednesday',
        open: '8:00',
        close: '22:00',
      },
      {
        day: 'Thursday',
        open: '8:00',
        close: '22:00',
      },
      {
        day: 'Friday',
        open: '8:00',
        close: '22:00',
      },
      {
        day: 'Saturday',
        open: '8:00',
        close: '22:00',
      },
      {
        day: 'Sunday',
        open: '8:00',
        close: '22:00',
      },
    ],
    rating: 4.5,
    ratingsQuantity: 100,
    ratingsAverage: 3,
    city: 'Texas',
    cuisine: 'BBQ',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const mockCuisines: Cuisine[] = [
  {
    _id: '1',
    name: 'Italian',
    imageCover: 'italian.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '2',
    name: 'Mexican',
    imageCover: 'mexican.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '3',
    name: 'Japanese',
    imageCover: 'japanese.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
