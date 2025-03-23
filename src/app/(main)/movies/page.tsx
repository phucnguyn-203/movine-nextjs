"use client";

import { useState, useEffect } from "react";
import { MovieGrid } from "@/components/movie-grid";
import InfiniteScroll from "react-infinite-scroll-component";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
}

const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
];

export default function MoviesPage() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState("popularity.desc");

    const fetchMovies = async (pageNum: number, genre?: number | null) => {
        try {
            const genreParam = genre ? `&with_genres=${genre}` : "";
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${pageNum}&sort_by=${sortBy}${genreParam}`
            );
            const data = await response.json();

            if (pageNum === 1) {
                setMovies(data.results);
            } else {
                setMovies((prev) => [...prev, ...data.results]);
            }

            setHasMore(data.page < data.total_pages);
            setPage(pageNum);
        } catch (error) {
            console.error("Error fetching movies:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setPage(1);
        setHasMore(true);
        fetchMovies(1, selectedGenre);
    }, [selectedGenre, sortBy]);

    const loadMore = () => {
        if (!isLoading && hasMore) {
            fetchMovies(page + 1, selectedGenre);
        }
    };

    return (
        <main className="min-h-screen bg-black py-8">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-white">Movies</h1>
                    <div className="flex flex-wrap gap-4">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-gray-800 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="popularity.desc">
                                Most Popular
                            </option>
                            <option value="vote_average.desc">
                                Highest Rated
                            </option>
                            <option value="release_date.desc">
                                Newest First
                            </option>
                        </select>
                        <select
                            value={selectedGenre || ""}
                            onChange={(e) =>
                                setSelectedGenre(
                                    e.target.value
                                        ? Number(e.target.value)
                                        : null
                                )
                            }
                            className="bg-gray-800 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">All Genres</option>
                            {genres.map((genre) => (
                                <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <InfiniteScroll
                    dataLength={movies.length}
                    next={loadMore}
                    hasMore={hasMore}
                    loader={
                        <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                        </div>
                    }
                >
                    <MovieGrid
                        movies={movies}
                        mediaType="movie"
                        isLoading={isLoading}
                    />
                </InfiniteScroll>
            </div>
        </main>
    );
}
