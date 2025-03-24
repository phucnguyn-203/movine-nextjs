"use client";

import { useState, useEffect, useCallback } from "react";
import { GridLayout } from "@/components/GridLayout";
import InfiniteScroll from "react-infinite-scroll-component";
import { TVShow } from "@/types/media";

const genres = [
    { id: 10759, name: "Action & Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 10762, name: "Kids" },
    { id: 9648, name: "Mystery" },
    { id: 10763, name: "News" },
    { id: 10764, name: "Reality" },
    { id: 10765, name: "Sci-Fi & Fantasy" },
    { id: 10766, name: "Soap" },
    { id: 10767, name: "Talk" },
    { id: 10768, name: "War & Politics" },
    { id: 37, name: "Western" },
];

export default function TVShowsPage() {
    const [shows, setShows] = useState<TVShow[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState("popularity.desc");

    const fetchShows = useCallback(
        async (pageNum: number, genre?: number | null) => {
            try {
                const genreParam = genre ? `&with_genres=${genre}` : "";
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${pageNum}&sort_by=${sortBy}${genreParam}`
                );
                const data = await response.json();

                if (pageNum === 1) {
                    setShows(data.results);
                } else {
                    setShows((prev) => [...prev, ...data.results]);
                }

                setHasMore(data.page < data.total_pages);
                setPage(pageNum);
            } catch (error) {
                console.error("Error fetching TV shows:", error);
            } finally {
                setIsLoading(false);
            }
        },
        [sortBy]
    );

    useEffect(() => {
        setPage(1);
        setHasMore(true);
        fetchShows(1, selectedGenre);
    }, [selectedGenre, sortBy, fetchShows]);

    const loadMore = () => {
        if (!isLoading && hasMore) {
            fetchShows(page + 1, selectedGenre);
        }
    };

    return (
        <main className="min-h-screen bg-black py-8">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-white">TV Shows</h1>
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
                            <option value="first_air_date.desc">
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
                    dataLength={shows.length}
                    next={loadMore}
                    hasMore={hasMore}
                    loader={
                        <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                        </div>
                    }
                >
                    <GridLayout
                        movies={shows.map((show) => ({
                            id: show.id,
                            title: show.name,
                            poster_path: show.poster_path,
                            vote_average: show.vote_average,
                            release_date: show.first_air_date,
                        }))}
                        mediaType="tv"
                        isLoading={isLoading}
                    />
                </InfiniteScroll>
            </div>
        </main>
    );
}
