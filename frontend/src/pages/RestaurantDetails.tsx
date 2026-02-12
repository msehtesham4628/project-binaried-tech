import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Star, Clock, MapPin } from 'lucide-react';

interface MenuItem {
    _id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
    isVeg: boolean;
}

interface Restaurant {
    _id: string;
    name: string;
    cuisine: string[];
    address: string;
    rating: number;
    deliveryTime: string;
    image: string;
    menu: MenuItem[];
}

const RestaurantDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/restaurants/${id}`);
                setRestaurant(response.data);
            } catch (error) {
                console.error('Error fetching restaurant:', error);
            }
        };
        fetchRestaurant();
    }, [id]);

    if (!restaurant) return <div className="text-center py-20 text-xl font-medium text-gray-500">Loading deliciousness...</div>;

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="relative h-72 md:h-96 rounded-[2rem] overflow-hidden shadow-2xl group">
                <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-8 md:p-12">
                    <div className="text-white w-full">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">{restaurant.name}</h1>
                                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm md:text-base font-medium">
                                    <span className="flex items-center bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                                        <Star size={18} className="mr-1.5 text-yellow-400 fill-current" /> {restaurant.rating}
                                    </span>
                                    <span className="flex items-center bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                                        <Clock size={18} className="mr-1.5" /> {restaurant.deliveryTime}
                                    </span>
                                    <span className="flex items-center bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                                        <MapPin size={18} className="mr-1.5" /> {restaurant.address}
                                    </span>
                                </div>
                                <div className="mt-4 flex gap-2">
                                    {restaurant.cuisine.map((c, i) => (
                                        <span key={i} className="bg-primary/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{c}</span>
                                    ))}
                                </div>
                            </div>
                            <button className="btn-primary self-start md:self-end">
                                View Reviews
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu */}
            <div>
                <h2 className="text-3xl font-bold mb-8 text-dark border-l-4 border-primary pl-4">Menu</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {restaurant.menu.map((item) => (
                        <div key={item._id} className="glass-card p-5 hover:border-primary/30 flex justify-between items-center group">
                            <div className="flex-1 pr-6">
                                <div className="flex items-center mb-2">
                                    <div className={`w-5 h-5 border-2 rounded-md flex items-center justify-center mr-3 ${item.isVeg ? 'border-green-500' : 'border-red-500'}`}>
                                        <div className={`w-2.5 h-2.5 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    </div>
                                    <h3 className="font-bold text-xl text-dark group-hover:text-primary transition-colors">{item.name}</h3>
                                </div>
                                <p className="text-gray-500 text-sm mb-3 line-clamp-2 leading-relaxed">{item.description}</p>
                                <p className="font-bold text-lg text-dark">${item.price}</p>
                            </div>
                            {item.image && (
                                <div className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 relative shadow-md group-hover:shadow-lg transition-all">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <button className="absolute bottom-2 right-2 bg-white text-primary font-bold px-4 py-1.5 rounded-lg shadow-lg text-sm hover:bg-primary hover:text-white transition-all transform hover:scale-105 active:scale-95">
                                        ADD
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RestaurantDetails;

