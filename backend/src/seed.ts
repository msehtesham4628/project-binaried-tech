import dotenv from 'dotenv';
import Restaurant from './models/Restaurant';
import { connectDB, disconnectDB } from './db';

dotenv.config();

const sampleRestaurants = [
    {
        name: "Pizza Paradise",
        cuisine: ["Italian", "Pizza"],
        address: "123 Cheese Avenue",
        rating: 4.5,
        deliveryTime: "30-40 min",
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&q=80",
        menu: [
            { name: "Margherita", description: "Classic cheese and tomato", price: 12, isVeg: true, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80" },
            { name: "Pepperoni", description: "Spicy pepperoni", price: 15, isVeg: false, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80" }
        ]
    },
    {
        name: "Burger King",
        cuisine: ["American", "Fast Food"],
        address: "456 Burger Lane",
        rating: 4.2,
        deliveryTime: "20-30 min",
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=80",
        menu: [
            { name: "Cheeseburger", description: "Juicy beef patty with cheese", price: 10, isVeg: false, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80" },
            { name: "Veggie Burger", description: "Plant-based patty", price: 11, isVeg: true, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80" }
        ]
    },
    {
        name: "Sushi World",
        cuisine: ["Japanese", "Sushi"],
        address: "789 Fish Street",
        rating: 4.8,
        deliveryTime: "40-50 min",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80",
        menu: [
            { name: "California Roll", description: "Crab, avocado, cucumber", price: 14, isVeg: false, image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80" },
            { name: "Spicy Tuna Roll", description: "Tuna with spicy sauce", price: 16, isVeg: false, image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=800&q=80" }
        ]
    }
];

const seedDB = async () => {
    try {
        await connectDB();

        await Restaurant.deleteMany({});
        console.log('Cleared existing data');

        await Restaurant.insertMany(sampleRestaurants);
        console.log('Seeded database');

        await disconnectDB();
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};

seedDB();

