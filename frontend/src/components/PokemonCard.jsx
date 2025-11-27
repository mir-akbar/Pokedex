import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const PokemonCard = ({ pokemon }) => {
    if (!pokemon) return null;

    const { name, types, stats, sprites, height, weight, abilities } = pokemon;

    return (
        <Card className="w-full max-w-md mx-auto overflow-hidden bg-white/90 backdrop-blur-sm shadow-xl border-0">
            <CardHeader className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6">
                <div className="flex justify-between items-center capitalize">
                    <CardTitle className="text-3xl font-bold">{name}</CardTitle>
                    <span className="text-lg opacity-80">#{String(pokemon.id).padStart(3, '0')}</span>
                </div>
                <div className="flex gap-2 mt-2">
                    {types.map((type) => (
                        <Badge key={type} variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
                            {type}
                        </Badge>
                    ))}
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="flex justify-center mb-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-transparent rounded-full opacity-50 blur-xl"></div>
                    <img
                        src={sprites.other['official-artwork'].front_default || sprites.front_default}
                        alt={name}
                        className="w-48 h-48 object-contain relative z-10 drop-shadow-lg hover:scale-110 transition-transform duration-300"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 text-center">
                    <div className="bg-gray-50 p-3 rounded-xl">
                        <p className="text-gray-500 text-sm">Height</p>
                        <p className="font-semibold text-lg">{height / 10} m</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl">
                        <p className="text-gray-500 text-sm">Weight</p>
                        <p className="font-semibold text-lg">{weight / 10} kg</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <h3 className="font-semibold text-gray-700 mb-2">Base Stats</h3>
                    {stats.map((stat) => (
                        <div key={stat.name} className="flex items-center gap-3 text-sm">
                            <span className="w-24 capitalize text-gray-600 font-medium">{stat.name.replace('-', ' ')}</span>
                            <div className="flex-1">
                                <Progress value={Math.min(stat.value, 100)} className="h-2.5" />
                            </div>
                            <span className="w-8 text-right font-bold text-gray-700">{stat.value}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-6">
                    <h3 className="font-semibold text-gray-700 mb-2">Abilities</h3>
                    <div className="flex flex-wrap gap-2">
                        {abilities.map((ability) => (
                            <span key={ability} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium capitalize border border-gray-200">
                                {ability.replace('-', ' ')}
                            </span>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PokemonCard;
