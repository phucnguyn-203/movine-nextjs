"use server";

export async function fetchMovies(
    page: number = 1,
    genre?: number | null,
    sortBy: string = "popularity.desc"
) {
    const genreParam = genre ? `&with_genres=${genre}` : "";
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}&sort_by=${sortBy}${genreParam}`,
        { next: { revalidate: 3600 } } // Revalidate every hour
    );

    if (!response.ok) {
        throw new Error("Failed to fetch movies");
    }

    return response.json();
}

export async function fetchTVShows(
    page: number = 1,
    genre?: number | null,
    sortBy: string = "popularity.desc"
) {
    const genreParam = genre ? `&with_genres=${genre}` : "";
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}&sort_by=${sortBy}${genreParam}`,
        { next: { revalidate: 3600 } } // Revalidate every hour
    );

    if (!response.ok) {
        throw new Error("Failed to fetch TV shows");
    }

    return response.json();
}

export async function fetchTrending(
    page: number = 1,
    mediaType: "all" | "movie" | "tv" | "person" = "all",
    timeWindow: "day" | "week" = "day"
) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/trending/${mediaType}/${timeWindow}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`,
        { next: { revalidate: 3600 } } // Revalidate every hour
    );

    if (!response.ok) {
        throw new Error("Failed to fetch trending content");
    }

    return response.json();
}

export async function searchData(query: string, mediaType: "movie" | "tv") {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/search/${mediaType}?api_key=${
            process.env.NEXT_PUBLIC_API_KEY
        }&query=${encodeURIComponent(query)}`,
        { next: { revalidate: 3600 } } // Revalidate every hour
    );

    if (!response.ok) {
        throw new Error("Failed to search content");
    }

    return response.json();
}
