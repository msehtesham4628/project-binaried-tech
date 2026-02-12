import React, { useState } from 'react';
import axios from 'axios';

const Admin: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        cuisine: '',
        address: '',
        deliveryTime: '',
        image: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                cuisine: formData.cuisine.split(',').map(c => c.trim()),
                menu: [] // Empty menu for now
            };
            await axios.post('http://localhost:5000/api/restaurants', payload);
            alert('Restaurant added successfully!');
            setFormData({ name: '', cuisine: '', address: '', deliveryTime: '', image: '' });
        } catch (error) {
            console.error('Error adding restaurant:', error);
            alert('Failed to add restaurant');
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-10">
            <h1 className="text-4xl font-bold mb-8 text-center text-dark">Add New <span className="text-primary">Restaurant</span></h1>
            <form onSubmit={handleSubmit} className="glass-card p-8 md:p-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700 ml-1">Restaurant Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="e.g. Tasty Bites"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700 ml-1">Cuisines</label>
                        <input
                            type="text"
                            name="cuisine"
                            value={formData.cuisine}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Italian, Pizza (comma separated)"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700 ml-1">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Full address"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700 ml-1">Delivery Time</label>
                        <input
                            type="text"
                            name="deliveryTime"
                            value={formData.deliveryTime}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="e.g. 30-40 min"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700 ml-1">Image URL</label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="https://..."
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full btn-primary mt-4 text-lg"
                >
                    Add Restaurant
                </button>
            </form>
        </div>
    );
};

export default Admin;

