const API_BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const fetchFromApi = async (endpoint: string) => {
    const response = await fetch(
        `${API_BASE_URL}${endpoint}?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.results;
};

const getTrendingMovies = () => fetchFromApi("/trending/movie/day");
const getTvShowsPopular = () => fetchFromApi("/tv/popular");
const getMoviesTopRated = () => fetchFromApi("/movie/top_rated");

const getHeroSection = async () => {
    const results = await fetchFromApi("/trending/all/day");
    // Get a random movie from the first 20 results
    const randomIndex = Math.floor(Math.random() * 20);
    return results[randomIndex];
};

export {
    getTrendingMovies,
    getTvShowsPopular,
    getMoviesTopRated,
    getHeroSection,
};

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
