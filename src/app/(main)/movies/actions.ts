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
