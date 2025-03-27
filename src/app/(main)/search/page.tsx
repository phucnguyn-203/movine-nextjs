import { Suspense } from "react";
import { Metadata } from "next";
import SearchResults from "./SearchResults";

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
    const params = await searchParams;
    const query = params.q || "";

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
