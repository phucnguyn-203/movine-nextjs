import { TrendingList } from "./TrendingList";
import { fetchTrending } from "@/actions";
import { Metadata } from "next";

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ mediaType?: string; timeWindow?: string }>;
}): Promise<Metadata> {
    const params = await searchParams;
    const mediaType = params.mediaType || "all";
    const timeWindow = params.timeWindow || "day";
    const timeWindowText = timeWindow === "day" ? "Today" : "This Week";

    let title = "";
    let description = "";

    if (mediaType === "all") {
        title = `Trending Movies & TV Shows ${timeWindowText} | Movine`;
        description = `Discover what's trending ${timeWindow.toLowerCase()} in movies and TV shows. Watch the most popular content right now.`;
    } else if (mediaType === "movie") {
        title = `Trending Movies ${timeWindowText} | Movine`;
        description = `Discover what's trending ${timeWindow.toLowerCase()} in movies. Watch the most popular films right now.`;
    } else if (mediaType === "tv") {
        title = `Trending TV Shows ${timeWindowText} | Movine`;
        description = `Discover what's trending ${timeWindow.toLowerCase()} in TV shows. Watch the most popular series right now.`;
    }

    return {
        title,
        description,
    };
}

export default async function TrendingPage({
    searchParams,
}: {
    searchParams: Promise<{
        page?: string;
        mediaType?: string;
        timeWindow?: string;
    }>;
}) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const mediaType =
        (params.mediaType as "all" | "movie" | "tv" | "person") || "all";
    const timeWindow = (params.timeWindow as "day" | "week") || "day";

    const initialData = await fetchTrending(page, mediaType, timeWindow);

    return (
        <main className="min-h-screen bg-black py-8">
            <div className="container mx-auto px-4 max-w-7xl">
                <TrendingList
                    initialData={initialData}
                    initialPage={page}
                    initialMediaType={mediaType}
                    initialTimeWindow={timeWindow}
                />
            </div>
        </main>
    );
}
