import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const PokemonSkeleton = () => {
    return (
        <Card className="w-full max-w-md mx-auto overflow-hidden bg-white/90 backdrop-blur-sm shadow-xl border-0">
            <CardHeader className="bg-gray-100 p-6">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-8 w-32 bg-gray-300" />
                    <Skeleton className="h-6 w-12 bg-gray-300" />
                </div>
                <div className="flex gap-2 mt-2">
                    <Skeleton className="h-6 w-16 bg-gray-300" />
                    <Skeleton className="h-6 w-16 bg-gray-300" />
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="flex justify-center mb-6 relative">
                    <Skeleton className="w-48 h-48 rounded-full bg-gray-200" />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <Skeleton className="h-16 rounded-xl bg-gray-100" />
                    <Skeleton className="h-16 rounded-xl bg-gray-100" />
                </div>

                <div className="space-y-3">
                    <Skeleton className="h-5 w-24 bg-gray-200 mb-2" />
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="flex items-center gap-3">
                            <Skeleton className="w-24 h-4 bg-gray-200" />
                            <Skeleton className="flex-1 h-2.5 rounded-full bg-gray-200" />
                            <Skeleton className="w-8 h-4 bg-gray-200" />
                        </div>
                    ))}
                </div>

                <div className="mt-6">
                    <Skeleton className="h-5 w-24 bg-gray-200 mb-2" />
                    <div className="flex gap-2">
                        <Skeleton className="h-6 w-20 rounded-full bg-gray-200" />
                        <Skeleton className="h-6 w-20 rounded-full bg-gray-200" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PokemonSkeleton;
