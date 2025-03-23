"use client";

import { useState, useEffect } from "react";
import { Hero } from "@/components/hero";
import { MovieSlider } from "@/components/movie-slider";
import { motion } from "framer-motion";

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

export default function HomePage() {
    const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
    const [popularTVShows, setPopularTVShows] = useState<TVShow[]>([]);
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [trendingResponse, tvShowsResponse, topRatedResponse] =
                    await Promise.all([
                        fetch(
                            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
                        ),
                        fetch(
                            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/tv/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
                        ),
                        fetch(
                            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
                        ),
                    ]);

                const [trendingData, tvShowsData, topRatedData] =
                    await Promise.all([
                        trendingResponse.json(),
                        tvShowsResponse.json(),
                        topRatedResponse.json(),
                    ]);

                setTrendingMovies(trendingData.results);
                setPopularTVShows(tvShowsData.results);
                setTopRatedMovies(topRatedData.results);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <main className="min-h-screen bg-black">
            <Hero />

            {/* Trending Movies Section */}
            <section className="py-8 sm:py-12">
                <div className="container mx-auto px-4 max-w-7xl">
                    <MovieSlider
                        movies={trendingMovies}
                        title="Trending Movies"
                        mediaType="movie"
                    />
                </div>
            </section>

            {/* Popular TV Shows Section */}
            <section className="py-8 sm:py-12">
                <div className="container mx-auto px-4 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <MovieSlider
                            movies={popularTVShows.map((show) => ({
                                id: show.id,
                                title: show.name,
                                poster_path: show.poster_path,
                                vote_average: show.vote_average,
                                release_date: show.first_air_date,
                            }))}
                            title="Popular TV Shows"
                            mediaType="tv"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Top Rated Movies Section */}
            <section className="py-8 sm:py-12">
                <div className="container mx-auto px-4 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <MovieSlider
                            movies={topRatedMovies}
                            title="Top Rated Movies"
                            mediaType="movie"
                        />
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
