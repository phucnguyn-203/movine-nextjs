const API_BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const fetchFromApi = async (endpoint: string, options?: any) => {
    const response = await fetch(
        `${API_BASE_URL}${endpoint}?api_key=${API_KEY}`,
        { ...options }
    );
    const data = await response.json();
    return data.results;
};

const getTrendingMovies = () => fetchFromApi("/trending/movie/day");
const getTvShowsPopular = () => fetchFromApi("/tv/popular");
const getMoviesTopRated = () => fetchFromApi("/movie/top_rated");

const getHeroSection = async () => {
    const results = await fetchFromApi("/trending/all/day", {
        caches: "no-store",
        next: { revalidate: 0 },
    });
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
