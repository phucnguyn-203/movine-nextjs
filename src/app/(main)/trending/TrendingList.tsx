"use client";

import { useState } from "react";
import { GridLayout } from "@/components/GridLayout";
import { Movie, TVShow } from "@/types/media";
import { fetchTrending } from "@/actions";
import { useRouter, useSearchParams } from "next/navigation";

interface TrendingListProps {
    initialData: {
        results: (Movie | TVShow)[];
        page: number;
        total_pages: number;
    };
    initialPage: number;
    initialMediaType: "all" | "movie" | "tv" | "person";
    initialTimeWindow: "day" | "week";
}

export function TrendingList({
    initialData,
    initialPage,
    initialMediaType,
    initialTimeWindow,
}: TrendingListProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [trending, setTrending] = useState<(Movie | TVShow)[]>(
        initialData.results
    );
    const [page, setPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(initialData.total_pages);
    const [isLoading, setIsLoading] = useState(false);
    const [mediaType, setMediaType] = useState<
        "all" | "movie" | "tv" | "person"
    >(initialMediaType);
    const [timeWindow, setTimeWindow] = useState<"day" | "week">(
        initialTimeWindow
    );

    const updateURL = (newPage: number, type: string, window: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        params.set("mediaType", type);
        params.set("timeWindow", window);
        router.push(`/trending?${params.toString()}`);
    };

    const loadTrending = async (pageNum: number) => {
        try {
            setIsLoading(true);
            const data = await fetchTrending(pageNum, mediaType, timeWindow);
            setTrending(data.results);
            setTotalPages(data.total_pages);
            setPage(pageNum);
            updateURL(pageNum, mediaType, timeWindow);
        } catch (error) {
            console.error("Error fetching trending content:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleMediaTypeChange = (type: "all" | "movie" | "tv" | "person") => {
        setMediaType(type);
        loadTrending(1);
    };

    const handleTimeWindowChange = (window: "day" | "week") => {
        setTimeWindow(window);
        loadTrending(1);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            loadTrending(newPage);
        }
    };

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-white">Trending</h1>
                <div className="flex flex-wrap gap-4">
                    <select
                        value={timeWindow}
                        onChange={(e) =>
                            handleTimeWindowChange(
                                e.target.value as "day" | "week"
                            )
                        }
                        className="bg-gray-800 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="day">Today</option>
                        <option value="week">This Week</option>
                    </select>
                    <select
                        value={mediaType}
                        onChange={(e) =>
                            handleMediaTypeChange(
                                e.target.value as
                                    | "all"
                                    | "movie"
                                    | "tv"
                                    | "person"
                            )
                        }
                        className="bg-gray-800 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="all">All</option>
                        <option value="movie">Movies</option>
                        <option value="tv">TV Shows</option>
                    </select>
                </div>
            </div>

            <GridLayout
                movies={trending.map((item) => ({
                    id: item.id,
                    title: "title" in item ? item.title : item.name,
                    poster_path: item.poster_path,
                    vote_average: item.vote_average,
                    release_date:
                        "release_date" in item
                            ? item.release_date
                            : item.first_air_date,
                }))}
                mediaType={mediaType === "all" ? "movie" : mediaType}
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
