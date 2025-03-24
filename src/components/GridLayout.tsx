"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
}

interface MovieGridProps {
    movies: Movie[];
    mediaType: string;
    isLoading: boolean;
}

export function GridLayout({ movies, mediaType, isLoading }: MovieGridProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                {[...Array(10)].map((_, index) => (
                    <div
                        key={index}
                        className="animate-pulse bg-gray-800 rounded-lg aspect-[2/3]"
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {movies.map((movie, index) => (
                <motion.div
                    key={movie.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="group"
                >
                    <Link
                        href={`/details/${mediaType}/${movie.id}`}
                        className="block"
                    >
                        <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-3">
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <h3 className="text-white font-semibold text-base sm:text-lg">
                                        {movie.title}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="flex items-center gap-1 text-[#ed1045]">
                                            <svg
                                                className="w-4 h-4"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            {movie.vote_average.toFixed(1)}
                                        </span>
                                        <span className="text-gray-300 text-sm">
                                            {new Date(
                                                movie.release_date
                                            ).getFullYear()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#ed1045]/50 transition-colors duration-500" />
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}
