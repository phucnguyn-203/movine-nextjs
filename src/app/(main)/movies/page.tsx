import { MovieList } from "./MovieList";
import { fetchMovies } from "./actions";

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

export default async function MoviesPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; genre?: string; sortBy?: string }>;
}) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const genre = params.genre ? Number(params.genre) : null;
    const sortBy = params.sortBy || "popularity.desc";

    const initialData = await fetchMovies(page, genre, sortBy);

    return (
        <main className="min-h-screen bg-black py-8">
            <div className="container mx-auto px-4 max-w-7xl">
                <MovieList
                    initialData={initialData}
                    genres={genres}
                    initialPage={page}
                    initialGenre={genre}
                    initialSortBy={sortBy}
                />
            </div>
        </main>
    );
}
