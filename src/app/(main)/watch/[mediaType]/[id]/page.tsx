"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

interface TVShowDetails {
    id: number;
    name: string;
    number_of_seasons: number;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    first_air_date: string;
    seasons: {
        season_number: number;
        episode_count: number;
        name: string;
        overview: string;
        poster_path: string;
    }[];
}

interface MovieDetails {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    release_date: string;
}

export default function WatchPage() {
    const params = useParams();
    const { mediaType, id } = params;
    const [details, setDetails] = useState<TVShowDetails | MovieDetails | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSeason, setSelectedSeason] = useState(1);
    const [selectedEpisode, setSelectedEpisode] = useState(1);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${mediaType}/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
                );
                const data = await response.json();
                setDetails(data);
            } catch (error) {
                console.error("Error fetching details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [mediaType, id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ed1045]"></div>
            </div>
        );
    }

    if (!details) return null;

    const videoUrl =
        mediaType === "movie"
            ? `${process.env.NEXT_PUBLIC_MOVIE_STREAMING_API_ENDPOINT}/${id}`
            : `${process.env.NEXT_PUBLIC_TV_STREAMING_API_ENDPOINT}/${id}/${selectedSeason}/${selectedEpisode}`;

    return (
        <main className="min-h-screen bg-black">
            {/* Video Player Section */}
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="relative w-full aspect-video">
                    <iframe
                        src={`${videoUrl}?autoplay=1`}
                        className="w-full h-full"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-6"
                >
                    {/* Poster */}
                    <div className="w-full sm:w-1/3">
                        <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_ENDPOINT}/${details.poster_path}`}
                                alt={
                                    mediaType === "movie"
                                        ? (details as MovieDetails).title
                                        : (details as TVShowDetails).name
                                }
                                width={500}
                                height={750}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                    </div>

                    {/* Details */}
                    <div className="w-full sm:w-2/3">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                            {mediaType === "movie"
                                ? (details as MovieDetails).title
                                : (details as TVShowDetails).name}
                        </h1>
                        <div className="flex items-center gap-4 mb-4">
                            <span className="px-3 py-1 bg-[#ed1045] text-white rounded-full text-sm">
                                {mediaType === "movie"
                                    ? new Date(
                                          (details as MovieDetails).release_date
                                      ).getFullYear()
                                    : new Date(
                                          (
                                              details as TVShowDetails
                                          ).first_air_date
                                      ).getFullYear()}
                            </span>
                            <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm">
                                {details.vote_average.toFixed(1)} / 10
                            </span>
                        </div>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            {details.overview}
                        </p>

                        {/* TV Show Seasons and Episodes */}
                        {mediaType === "tv" && (
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="md:col-span-1">
                                    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
                                        <h2 className="text-xl font-semibold text-white mb-4">
                                            Seasons
                                        </h2>
                                        <div className="space-y-2">
                                            {(
                                                details as TVShowDetails
                                            ).seasons.map((season) => (
                                                <button
                                                    key={season.season_number}
                                                    onClick={() => {
                                                        setSelectedSeason(
                                                            season.season_number
                                                        );
                                                        setSelectedEpisode(1);
                                                    }}
                                                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                                                        selectedSeason ===
                                                        season.season_number
                                                            ? "bg-[#ed1045] text-white"
                                                            : "text-gray-300 hover:bg-white/10"
                                                    }`}
                                                >
                                                    {season.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="md:col-span-3">
                                    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
                                        <h2 className="text-xl font-semibold text-white mb-4">
                                            Episodes
                                        </h2>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                            {Array.from(
                                                {
                                                    length:
                                                        (
                                                            details as TVShowDetails
                                                        ).seasons.find(
                                                            (s) =>
                                                                s.season_number ===
                                                                selectedSeason
                                                        )?.episode_count || 0,
                                                },
                                                (_, i) => i + 1
                                            ).map((episode) => (
                                                <button
                                                    key={episode}
                                                    onClick={() =>
                                                        setSelectedEpisode(
                                                            episode
                                                        )
                                                    }
                                                    className={`px-4 py-2 rounded-md transition-colors ${
                                                        selectedEpisode ===
                                                        episode
                                                            ? "bg-[#ed1045] text-white"
                                                            : "bg-white/10 text-gray-300 hover:bg-white/20"
                                                    }`}
                                                >
                                                    Episode {episode}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
