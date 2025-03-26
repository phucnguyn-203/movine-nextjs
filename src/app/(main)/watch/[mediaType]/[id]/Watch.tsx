"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

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

interface Props {
    details: TVShowDetails | MovieDetails;
    mediaType: string;
    currentSeason: number;
    currentEpisode: number;
}

export default function Watch({
    details,
    mediaType,
    currentSeason,
    currentEpisode,
}: Props) {
    const router = useRouter();

    const handleSeasonChange = (season: number) => {
        router.push(`/watch/${mediaType}/${details.id}?s=${season}&e=1`);
    };

    const handleEpisodeChange = (episode: number) => {
        router.push(
            `/watch/${mediaType}/${details.id}?s=${currentSeason}&e=${episode}`
        );
    };

    const videoUrl =
        mediaType === "movie"
            ? `${process.env.NEXT_PUBLIC_MOVIE_STREAMING_API_ENDPOINT}/${details.id}`
            : `${process.env.NEXT_PUBLIC_TV_STREAMING_API_ENDPOINT}/${details.id}&s=${currentSeason}&e=${currentEpisode}`;

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
                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/w500${details.poster_path}`}
                                alt={
                                    mediaType === "movie"
                                        ? (details as MovieDetails).title
                                        : (details as TVShowDetails).name
                                }
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover"
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
                                                    onClick={() =>
                                                        handleSeasonChange(
                                                            season.season_number
                                                        )
                                                    }
                                                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                                                        currentSeason ===
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
                                                                currentSeason
                                                        )?.episode_count || 0,
                                                },
                                                (_, i) => i + 1
                                            ).map((episode) => (
                                                <button
                                                    key={episode}
                                                    onClick={() =>
                                                        handleEpisodeChange(
                                                            episode
                                                        )
                                                    }
                                                    className={`px-4 py-2 rounded-md transition-colors ${
                                                        currentEpisode ===
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
