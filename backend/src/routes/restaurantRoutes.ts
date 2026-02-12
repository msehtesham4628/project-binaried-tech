import express, { Request, Response } from 'express';
import Restaurant, { IRestaurant } from '../models/Restaurant';

const router = express.Router();

// Get all restaurants with search and filter
router.get('/', async (req: Request, res: Response) => {
    try {
        const { search, cuisine } = req.query;
        let query: any = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { cuisine: { $regex: search, $options: 'i' } }
            ];
        }

        if (cuisine) {
            query.cuisine = { $in: [cuisine] };
        }

        const restaurants = await Restaurant.find(query);
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get restaurant by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
        res.json(restaurant);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Create a new restaurant (Admin)
router.post('/', async (req: Request, res: Response) => {
    try {
        const newRestaurant: IRestaurant = new Restaurant(req.body);
        const savedRestaurant = await newRestaurant.save();
        res.status(201).json(savedRestaurant);
    } catch (err) {
        res.status(400).json({ message: 'Error creating restaurant', error: err });
    }
});

export default router;

