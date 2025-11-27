import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const fetchPokemon = async (name) => {
    try {
        const response = await axios.get(`${API_URL}/pokemon/${name}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
