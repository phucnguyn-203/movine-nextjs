"use client";

import { useState, useEffect } from "react";
import { MovieGrid } from "@/components/movie-grid";
import Link from "next/link";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
}

interface TVShow {
    id: number;
    name: string;
    poster_path: string;
    vote_average: number;
    first_air_date: string;
}

type TimeWindow = "day" | "week";

export default function TrendingPage() {
    const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
    const [trendingShows, setTrendingShows] = useState<TVShow[]>([]);
    const [timeWindow, setTimeWindow] = useState<TimeWindow>("day");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const [moviesRes, showsRes] = await Promise.all([
                    fetch(
                        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/trending/movie/${timeWindow}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
                    ),
                    fetch(
                        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/trending/tv/${timeWindow}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
                    ),
                ]);

                const [moviesData, showsData] = await Promise.all([
                    moviesRes.json(),
                    showsRes.json(),
                ]);

                setTrendingMovies(moviesData.results);
                setTrendingShows(showsData.results);
            } catch (error) {
                console.error("Error fetching trending:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTrending();
    }, [timeWindow]);

    const SectionHeader = ({
        title,
        link,
    }: {
        title: string;
        link: string;
    }) => (
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">{title}</h2>
            <Link
                href={link}
                className="flex items-center gap-2 text-gray-400 hover:text-[#ed1045] transition-colors"
            >
                <span>View All</span>
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </Link>
        </div>
    );

    return (
        <main className="min-h-screen bg-black py-8">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex items-center justify-between mb-12">
                    <h1 className="text-4xl font-bold text-white">
                        Trending Now
                    </h1>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setTimeWindow("day")}
                            className={`px-6 py-2 rounded-full transition-colors ${
                                timeWindow === "day"
                                    ? "bg-[#ed1045] text-white"
                                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                            }`}
                        >
                            Today
                        </button>
                        <button
                            onClick={() => setTimeWindow("week")}
                            className={`px-6 py-2 rounded-full transition-colors ${
                                timeWindow === "week"
                                    ? "bg-[#ed1045] text-white"
                                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                            }`}
                        >
                            This Week
                        </button>
                    </div>
                </div>

                <div className="space-y-16">
                    {/* Trending Movies Section */}
                    <section>
                        <SectionHeader title="Trending Movies" link="/movies" />
                        <MovieGrid
                            movies={trendingMovies}
                            mediaType="movie"
                            isLoading={isLoading}
                        />
                    </section>

                    {/* Trending TV Shows Section */}
                    <section>
                        <SectionHeader
                            title="Trending TV Shows"
                            link="/tvshows"
                        />
                        <MovieGrid
                            movies={trendingShows.map((show) => ({
                                id: show.id,
                                title: show.name,
                                poster_path: show.poster_path,
                                vote_average: show.vote_average,
                                release_date: show.first_air_date,
                            }))}
                            mediaType="tv"
                            isLoading={isLoading}
                        />
                    </section>
                </div>
            </div>
        </main>
    );
}
