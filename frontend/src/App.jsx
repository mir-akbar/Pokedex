import { useState } from 'react';
import { fetchPokemon } from './lib/api';
import PokemonCard from './components/PokemonCard';
import PokemonSkeleton from './components/PokemonSkeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';

function App() {
  const [query, setQuery] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [source, setSource] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setPokemon(null);
    setSource(null);

    try {
      const result = await fetchPokemon(query.toLowerCase());
      setPokemon(result.data);
      setSource(result.source);
    } catch (err) {
      setError(err.response?.status === 404 ? 'Pokemon not found!' : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center py-12 px-4 font-sans text-slate-900">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500 drop-shadow-sm">
            Pokédex
          </h1>
          <p className="text-slate-500 font-medium">Search for your favorite Pokémon</p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2 relative">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Enter Pokemon name (e.g., Pikachu)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 bg-white border-slate-200 focus:border-red-500 focus:ring-red-500 h-12 text-lg shadow-sm rounded-xl"
            />
          </div>
          <Button type="submit" disabled={loading} className="h-12 px-6 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold shadow-md transition-all hover:shadow-lg">
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Search'}
          </Button>
        </form>

        {error && (
          <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-center font-medium animate-in fade-in slide-in-from-top-2">
            {error}
          </div>
        )}

        {loading && <PokemonSkeleton />}

        {pokemon && !loading && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PokemonCard pokemon={pokemon} />
            {source && (
              <p className="text-center text-xs text-slate-400 mt-4 font-medium uppercase tracking-wide">
                Source: {source === 'cache' ? '⚡ Redis Cache' : '🌐 PokeAPI'}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
