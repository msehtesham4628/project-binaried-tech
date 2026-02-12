import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Utensils } from 'lucide-react';

import DarkModeToggle from './DarkModeToggle';

const Navbar: React.FC = () => {
    return (
        <nav className="glass sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-primary group">
                <div className="bg-primary text-white p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                    <Utensils size={24} />
                </div>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">
                    Foodie<span className="text-dark">Delight</span>
                </span>
            </Link>
            <div className="flex items-center space-x-8">
                <Link to="/" className="text-dark font-medium hover:text-primary transition-colors relative group">
                    Home
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link to="/admin" className="text-dark font-medium hover:text-primary transition-colors relative group">
                    Admin
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <div className="flex items-center space-x-4">
                    <DarkModeToggle />
                    <button className="p-2 rounded-full hover:bg-primary/10 text-dark hover:text-primary transition-all duration-300">
                        <ShoppingBag size={20} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-primary/10 text-dark hover:text-primary transition-all duration-300">
                        <User size={20} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
