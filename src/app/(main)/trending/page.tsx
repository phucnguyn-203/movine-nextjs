import { TrendingList } from "./TrendingList";
import { fetchTrending } from "@/actions";

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
