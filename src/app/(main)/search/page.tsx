"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Movie, TVShow, MediaType } from "@/types/media";
import { searchData } from "@/actions";
import { Metadata } from "next";

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";
    const [movies, setMovies] = useState<Movie[]>([]);
    const [tvShows, setTVShows] = useState<TVShow[]>([]);
    const [selectedType, setSelectedType] = useState<MediaType>("movie");
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(async () => {
        if (!query) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        try {
            const [moviesResponse, tvShowsResponse] = await Promise.all([
                searchData(query, "movie"),
                searchData(query, "tv"),
            ]);

            setMovies(moviesResponse.results);
            setTVShows(tvShowsResponse.results);
        } catch (error) {
            console.error("Error fetching search results:", error);
        } finally {
            setIsLoading(false);
        }
    }, [query]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const filteredMovies = movies.filter((movie) => movie.poster_path);
    const filteredTVShows = tvShows.filter((show) => show.poster_path);

    return (
        <main className="min-h-screen bg-black pt-16">
            <div className="container mx-auto px-4 max-w-7xl py-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-8">
                    Search Results for &quot;{query}&quot;
                </h1>

                {/* Filter Tags */}
                <div className="flex flex-wrap gap-3 mb-8">
                    <button
                        onClick={() => setSelectedType("movie")}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                            selectedType === "movie"
                                ? "bg-[#ed1045] text-white"
                                : "bg-white/10 text-gray-300 hover:bg-white/20"
                        }`}
                    >
                        Movies ({filteredMovies.length})
                    </button>
                    <button
                        onClick={() => setSelectedType("tv")}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                            selectedType === "tv"
                                ? "bg-[#ed1045] text-white"
                                : "bg-white/10 text-gray-300 hover:bg-white/20"
                        }`}
                    >
                        TV Shows ({filteredTVShows.length})
                    </button>
                </div>

                {/* Results */}
                {isLoading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {[...Array(10)].map((_, i) => (
                            <div
                                key={i}
                                className="aspect-[2/3] rounded-lg bg-white/10 animate-pulse"
                            />
                        ))}
                    </div>
                ) : (
                    <>
                        {selectedType === "movie" &&
                            filteredMovies.length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {filteredMovies.map((movie) => (
                                        <Link
                                            key={movie.id}
                                            href={`/details/movie/${movie.id}`}
                                            className="group relative aspect-[2/3] rounded-lg overflow-hidden"
                                        >
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/w500${movie.poster_path}`}
                                                alt={movie.title}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                                    <h3 className="text-white font-medium line-clamp-2">
                                                        {movie.title}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <span className="text-yellow-400 text-sm">
                                                            ★{" "}
                                                            {movie.vote_average.toFixed(
                                                                1
                                                            )}
                                                        </span>
                                                        <span className="text-gray-300 text-sm">
                                                            {new Date(
                                                                movie.release_date
                                                            ).getFullYear()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}

                        {selectedType === "tv" &&
                            filteredTVShows.length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {filteredTVShows.map((show) => (
                                        <Link
                                            key={show.id}
                                            href={`/details/tv/${show.id}`}
                                            className="group relative aspect-[2/3] rounded-lg overflow-hidden"
                                        >
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/w500${show.poster_path}`}
                                                alt={show.name}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                                    <h3 className="text-white font-medium line-clamp-2">
                                                        {show.name}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <span className="text-yellow-400 text-sm">
                                                            ★{" "}
                                                            {show.vote_average.toFixed(
                                                                1
                                                            )}
                                                        </span>
                                                        <span className="text-gray-300 text-sm">
                                                            {new Date(
                                                                show.first_air_date
                                                            ).getFullYear()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}

                        {!isLoading &&
                            selectedType === "movie" &&
                            filteredMovies.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-gray-400 text-lg">
                                        No movies found for &quot;{query}&quot;
                                    </p>
                                </div>
                            )}

                        {!isLoading &&
                            selectedType === "tv" &&
                            filteredTVShows.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-gray-400 text-lg">
                                        No TV shows found for &quot;{query}
                                        &quot;
                                    </p>
                                </div>
                            )}
                    </>
                )}
            </div>
        </main>
    );
}

export async function generateMetadata({
    searchParams,
}: {
    searchParams: { q?: string };
}): Promise<Metadata> {
    const query = searchParams.q || "";

    if (!query) {
        return {
            title: "Search Movies & TV Shows | Movine",
            description:
                "Search for your favorite movies and TV shows. Find the latest and most popular content.",
        };
    }

    return {
        title: `Search Results for "${query}" | Movine`,
        description: `Search results for "${query}" in movies and TV shows. Find what you're looking for on Movine.`,
    };
}

export default function SearchPage() {
    return (
        <Suspense
            fallback={
                <main className="min-h-screen bg-black pt-16">
                    <div className="container mx-auto px-4 max-w-7xl py-8">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {[...Array(10)].map((_, i) => (
                                <div
                                    key={i}
                                    className="aspect-[2/3] rounded-lg bg-white/10 animate-pulse"
                                />
                            ))}
                        </div>
                    </div>
                </main>
            }
        >
            <SearchResults />
        </Suspense>
    );
}
