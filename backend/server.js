import express from 'express';
import axios from 'axios';
import { createClient } from 'redis';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

app.use(cors());
app.use(express.json());

// Redis Client Setup
const redisClient = createClient({
    url: REDIS_URL
});

let redisAvailable = false;

redisClient.on('error', (err) => {
    console.error('Redis Client Error', err.message);
    redisAvailable = false;
});

redisClient.on('connect', () => {
    console.log('Connected to Redis');
    redisAvailable = true;
});

(async () => {
    try {
        await redisClient.connect();
    } catch (err) {
        console.log('Failed to connect to Redis, running without cache');
    }
})();

const CACHE_EXPIRATION = 3600; // 1 hour

app.get('/api/pokemon/:name', async (req, res) => {
    const pokemonName = req.params.name.toLowerCase();
    const cacheKey = `pokemon:${pokemonName}`;

    try {
        // Check Cache
        if (redisAvailable) {
            try {
                const cachedData = await redisClient.get(cacheKey);
                if (cachedData) {
                    console.log(`Cache Hit for ${pokemonName}`);
                    return res.json({ source: 'cache', data: JSON.parse(cachedData) });
                }
            } catch (e) {
                console.error('Redis get error:', e.message);
            }
        }

        console.log(`Cache Miss for ${pokemonName}`);
        
        // Fetch from PokeAPI
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const pokemonData = response.data;

        // Extract interesting attributes
        const formattedData = {
            id: pokemonData.id,
            name: pokemonData.name,
            height: pokemonData.height,
            weight: pokemonData.weight,
            types: pokemonData.types.map(t => t.type.name),
            abilities: pokemonData.abilities.map(a => a.ability.name),
            stats: pokemonData.stats.map(s => ({ name: s.stat.name, value: s.base_stat })),
            sprites: {
                front_default: pokemonData.sprites.front_default,
                other: {
                    'official-artwork': {
                        front_default: pokemonData.sprites.other['official-artwork'].front_default
                    }
                }
            }
        };

        // Save to Cache
        if (redisAvailable) {
            try {
                await redisClient.set(cacheKey, JSON.stringify(formattedData), {
                    EX: CACHE_EXPIRATION
                });
            } catch (e) {
                console.error('Redis set error:', e.message);
            }
        }

        res.json({ source: 'api', data: formattedData });

    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ error: 'Pokemon not found' });
        }
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
