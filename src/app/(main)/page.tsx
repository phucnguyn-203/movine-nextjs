import { Hero } from "@/components/Hero";
import { SliderLayout } from "@/components/SliderLayout";

import {
    getHeroSection,
    getTrendingMovies,
    getTvShowsPopular,
    getMoviesTopRated,
} from "@/api";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const heroData = await getHeroSection();
    return {
        title: "Movine - Movie Streaming App",
        description: "Watch your favorite movies and TV shows",
        openGraph: {
            title: heroData.title || heroData.name,
            description: heroData.overview,
            images: [`/images/favicon.png`],
        },
    };
}

export default async function HomePage() {
    const heroData = await getHeroSection();
    const trendingMovies = await getTrendingMovies();
    const popularTVShows = await getTvShowsPopular();
    const topRatedMovies = await getMoviesTopRated();

    return (
        <main className="min-h-screen bg-black">
            <Hero data={heroData} />

            {/* Trending Movies Section */}
            <section className="py-8 sm:py-12">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">
                        Trending Movies
                    </h2>
                    <SliderLayout data={trendingMovies} />
                </div>
            </section>

            {/* Popular TV Shows Section */}
            <section className="py-8 sm:py-12">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">
                        Popular TV Shows
                    </h2>
                    <SliderLayout data={popularTVShows} />
                </div>
            </section>

            {/* Top Rated Movies Section */}
            <section className="py-8 sm:py-12">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">
                        Top Rated Movies
                    </h2>
                    <SliderLayout data={topRatedMovies} />
                </div>
            </section>
        </main>
    );
}
