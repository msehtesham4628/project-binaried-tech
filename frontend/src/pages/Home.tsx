import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Search, Star, Clock } from 'lucide-react';

interface Restaurant {
    _id: string;
    name: string;
    cuisine: string[];
    rating: number;
    deliveryTime: string;
    image: string;
}

const Home: React.FC = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetchRestaurants();
    }, [search, filter]);

    const fetchRestaurants = async () => {
        try {
            let url = 'http://localhost:5000/api/restaurants';
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (filter) params.append('cuisine', filter);

            const response = await axios.get(`${url}?${params.toString()}`);
            setRestaurants(response.data);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        }
    };

    return (
        <div className="space-y-12">
            {/* Hero Section */}
            {/* Hero Section */}
            <div className="text-center space-y-6 py-16 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-gradient-to-r from-primary-light/30 to-secondary-light/30 blur-3xl -z-10 rounded-full opacity-60"></div>
                <h1 className="text-5xl md:text-7xl font-bold text-dark tracking-tight">
                    Delicious Food, <br />
                    <span className="text-primary">Delivered To You</span>
                </h1>
                <p className="text-gray-500 text-xl max-w-2xl mx-auto font-light">
                    Discover the best food from over 1,000 restaurants and get it delivered to your doorstep in minutes.
                </p>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary-light to-secondary-light rounded-full blur opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            placeholder="Search for restaurants or cuisines..."
                            className="w-full px-8 py-4 rounded-full shadow-lg border-none focus:ring-2 focus:ring-primary/50 outline-none pl-6 text-lg bg-white/95 backdrop-blur-sm transition-all"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="absolute right-2 bg-primary hover:bg-primary-dark text-white p-3 rounded-full transition-colors shadow-md">
                            <Search className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex justify-center flex-wrap gap-4 pb-4">
                {['Italian', 'Fast Food', 'Japanese', 'Indian', 'Mexican'].map((cuisine) => (
                    <button
                        key={cuisine}
                        onClick={() => setFilter(filter === cuisine ? '' : cuisine)}
                        className={`px-8 py-3 rounded-full transition-all duration-300 font-medium text-sm md:text-base ${filter === cuisine
                            ? 'bg-primary text-white shadow-lg scale-105'
                            : 'bg-white text-gray-600 hover:bg-primary-light/20 hover:text-primary hover:shadow-md hover:-translate-y-0.5 border border-gray-100'
                            }`}
                    >
                        {cuisine}
                    </button>
                ))}
            </div>

            {/* Restaurant Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {restaurants.map((restaurant) => (
                    <Link to={`/restaurant/${restaurant._id}`} key={restaurant._id} className="block group">
                        <div className="glass-card overflow-hidden h-full hover:shadow-xl hover:shadow-primary/10">
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={restaurant.image}
                                    alt={restaurant.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-bold flex items-center shadow-sm text-dark">
                                    <Clock size={14} className="mr-1.5 text-primary" />
                                    {restaurant.deliveryTime}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <span className="text-white font-medium">View Menu &rarr;</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors">
                                        {restaurant.name}
                                    </h3>
                                    <div className="flex items-center bg-green-50 px-2.5 py-1 rounded-lg text-green-700 text-sm font-bold border border-green-100">
                                        <Star size={14} className="mr-1 fill-current" />
                                        {restaurant.rating}
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm mb-4 flex flex-wrap gap-2">
                                    {restaurant.cuisine.map((c, i) => (
                                        <span key={i} className="bg-gray-100 px-2 py-0.5 rounded text-xs font-medium text-gray-600">{c}</span>
                                    ))}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;
