"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

interface Details {
    id: number;
    title?: string;
    name?: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
    genres: { id: number; name: string }[];
    runtime?: number;
    number_of_seasons?: number;
    number_of_episodes?: number;
}

interface Cast {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

export default function DetailsPage() {
    const params = useParams();
    const { mediaType, id } = params;
    const [details, setDetails] = useState<Details | null>(null);
    const [cast, setCast] = useState<Cast[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const [detailsResponse, creditsResponse] = await Promise.all([
                    fetch(
                        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${mediaType}/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
                    ),
                    fetch(
                        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${mediaType}/${id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
                    ),
                ]);

                const [detailsData, creditsData] = await Promise.all([
                    detailsResponse.json(),
                    creditsResponse.json(),
                ]);

                setDetails(detailsData);
                setCast(creditsData.cast.slice(0, 6));
            } catch (error) {
                console.error("Error fetching details:", error);
                toast.error("Failed to load details");
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [mediaType, id]);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        toast.success(
            !isFavorite ? "Added to favorites" : "Removed from favorites"
        );
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ed1045]"></div>
            </div>
        );
    }

    if (!details) return null;

    const title = mediaType === "movie" ? details.title : details.name;
    const releaseDate =
        mediaType === "movie" ? details.release_date : details.first_air_date;

    return (
        <main className="min-h-screen bg-black">
            {/* Hero Section with Backdrop */}
            <div className="relative min-h-[calc(100vh-4rem)] w-full">
                <motion.div
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
                        alt={title || ""}
                        fill
                        className="object-cover"
                        priority
                        quality={100}
                    />
                    {/* Lighter gradient overlays for better visibility */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/50" />
                    {/* Subtle radial gradient for depth */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
                </motion.div>

                {/* Content Section */}
                <div className="absolute inset-0 flex items-start sm:items-center py-8">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
                            {/* Left Section - Poster */}
                            <motion.div
                                initial={{ opacity: 0, x: -50, scale: 0.8 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="w-full lg:w-1/3 flex justify-center lg:justify-start"
                            >
                                <div className="w-32 sm:w-40 lg:w-full max-w-[250px] transform hover:scale-105 transition-transform duration-500">
                                    <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl shadow-[#ed1045]/20 hover:shadow-[#ed1045]/40 transition-shadow duration-500">
                                        <Image
                                            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                                            alt={title || ""}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                                        <div className="absolute inset-0 border-2 border-white/10 rounded-xl" />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Right Section - Content */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="w-full lg:w-2/3"
                            >
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 drop-shadow-lg"
                                >
                                    {title}
                                </motion.h1>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="flex flex-wrap items-center gap-2 text-gray-300 mb-3"
                                >
                                    <span className="flex items-center gap-1 bg-[#ed1045]/20 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#ed1045]/30 text-xs sm:text-sm">
                                        <svg
                                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ed1045]"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        {details.vote_average.toFixed(1)}
                                    </span>
                                    <span className="bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20 text-xs sm:text-sm">
                                        {new Date(
                                            releaseDate || ""
                                        ).getFullYear()}
                                    </span>
                                    {details.runtime && (
                                        <span className="bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20 text-xs sm:text-sm">
                                            {details.runtime} min
                                        </span>
                                    )}
                                    {details.number_of_seasons && (
                                        <span className="bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20 text-xs sm:text-sm">
                                            {details.number_of_seasons} Seasons
                                        </span>
                                    )}
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className="flex flex-wrap gap-2 mb-3"
                                >
                                    {details.genres.map((genre) => (
                                        <span
                                            key={genre.id}
                                            className="px-2.5 py-1 bg-white/10 backdrop-blur-sm text-gray-300 rounded-full text-xs sm:text-sm hover:bg-white/20 transition-colors duration-300 border border-white/20"
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                    className="bg-black/50 backdrop-blur-sm p-3 sm:p-4 rounded-xl mb-4 hover:bg-black/60 transition-colors duration-300 border border-white/10"
                                >
                                    <h2 className="text-base sm:text-lg font-semibold text-white mb-2">
                                        Overview
                                    </h2>
                                    <p className="text-gray-300 leading-relaxed text-xs sm:text-sm line-clamp-4 sm:line-clamp-none">
                                        {details.overview}
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                    className="flex flex-col sm:flex-row gap-2 sm:gap-3"
                                >
                                    <Link
                                        href={`/watch/${mediaType}/${id}`}
                                        className="group inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 bg-[#ed1045] text-white rounded-full hover:bg-[#ff1a5c] transition-all duration-300 shadow-lg shadow-[#ed1045]/20 hover:shadow-[#ed1045]/30 hover:scale-105 text-xs sm:text-sm font-semibold"
                                    >
                                        <span>Watch Now</span>
                                        <svg
                                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </Link>
                                    <button
                                        onClick={toggleFavorite}
                                        className="group inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20 text-xs sm:text-sm font-semibold"
                                    >
                                        <svg
                                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors duration-300 ${
                                                isFavorite
                                                    ? "text-[#ed1045]"
                                                    : "text-gray-400 group-hover:text-white"
                                            }`}
                                            fill={
                                                isFavorite
                                                    ? "currentColor"
                                                    : "none"
                                            }
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                            />
                                        </svg>
                                        <span>Add to Favorites</span>
                                    </button>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cast Section */}
            <div className="bg-black/80 backdrop-blur-sm py-8 sm:py-12">
                <div className="container mx-auto px-4 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                    >
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">
                            Cast
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
                            {cast.map((actor) => (
                                <motion.div
                                    key={actor.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="group"
                                >
                                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2 sm:mb-3">
                                        <Image
                                            src={
                                                actor.profile_path
                                                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                                                    : "/placeholder.png"
                                            }
                                            alt={actor.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                                                <h3 className="text-white font-semibold text-sm sm:text-base">
                                                    {actor.name}
                                                </h3>
                                                <p className="text-gray-300 text-xs sm:text-sm">
                                                    {actor.character}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
