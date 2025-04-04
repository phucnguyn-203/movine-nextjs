"use client";

import { useState } from "react";
import { GridLayout } from "@/components/GridLayout";
import { Movie } from "@/types/media";
import { fetchMovies } from "@/actions";
import { useRouter, useSearchParams } from "next/navigation";

interface MoviesClientProps {
    initialData: {
        results: Movie[];
        page: number;
        total_pages: number;
    };
    genres: { id: number; name: string }[];
    initialPage: number;
    initialGenre: number | null;
    initialSortBy: string;
}

export function MovieList({
    initialData,
    genres,
    initialPage,
    initialGenre,
    initialSortBy,
}: MoviesClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [movies, setMovies] = useState<Movie[]>(initialData.results);
    const [page, setPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(initialData.total_pages);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState<number | null>(
        initialGenre
    );
    const [sortBy, setSortBy] = useState(initialSortBy);

    const updateURL = (newPage: number, genre: number | null, sort: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        if (genre) {
            params.set("genre", genre.toString());
        } else {
            params.delete("genre");
        }
        params.set("sortBy", sort);
        router.push(`/movies?${params.toString()}`);
    };

    const loadMovies = async (pageNum: number, genre?: number | null) => {
        try {
            setIsLoading(true);
            const data = await fetchMovies(pageNum, genre, sortBy);
            setMovies(data.results);
            setTotalPages(data.total_pages);
            setPage(pageNum);
            updateURL(pageNum, genre || null, sortBy);
        } catch (error) {
            console.error("Error fetching movies:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenreChange = (genre: number | null) => {
        setSelectedGenre(genre);
        loadMovies(1, genre);
    };

    const handleSortChange = (sort: string) => {
        setSortBy(sort);
        loadMovies(1, selectedGenre);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            loadMovies(newPage, selectedGenre);
        }
    };

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-white">Movies</h1>
                <div className="flex flex-wrap gap-4">
                    <select
                        value={sortBy}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="bg-gray-800 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="popularity.desc">Most Popular</option>
                        <option value="vote_average.desc">Highest Rated</option>
                        <option value="release_date.desc">Newest First</option>
                    </select>
                    <select
                        value={selectedGenre || ""}
                        onChange={(e) =>
                            handleGenreChange(
                                e.target.value ? Number(e.target.value) : null
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

            <GridLayout
                movies={movies}
                mediaType="movie"
                isLoading={isLoading}
            />

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-2 mt-8">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1 || isLoading}
                    className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                >
                    Previous
                </button>
                <span className="text-white px-4">
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages || isLoading}
                    className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                >
                    Next
                </button>
            </div>
        </>
    );
}
