import { TVShowsList } from "./TVShowsList";
import { fetchTVShows } from "@/actions";
import { Metadata } from "next";

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

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ genre?: string }>;
}): Promise<Metadata> {
    const params = await searchParams;
    const genre = params.genre ? Number(params.genre) : null;
    const genreName = genres.find((g) => g.id === genre)?.name || "All";

    return {
        title: `${genreName} TV Shows | Movine`,
        description: `Browse our collection of ${genreName.toLowerCase()} TV shows. Watch the latest and most popular ${genreName.toLowerCase()} TV series online.`,
    };
}

export default async function TVShowsPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; genre?: string; sortBy?: string }>;
}) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const genre = params.genre ? Number(params.genre) : null;
    const sortBy = params.sortBy || "popularity.desc";

    const initialData = await fetchTVShows(page, genre, sortBy);

    return (
        <main className="min-h-screen bg-black py-8">
            <div className="container mx-auto px-4 max-w-7xl">
                <TVShowsList
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
