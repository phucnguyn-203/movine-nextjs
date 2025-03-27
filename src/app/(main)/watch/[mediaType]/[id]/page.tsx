import { notFound } from "next/navigation";
import Watch from "./Watch";

interface TVShowDetails {
    id: number;
    name: string;
    number_of_seasons: number;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    first_air_date: string;
    seasons: {
        season_number: number;
        episode_count: number;
        name: string;
        overview: string;
        poster_path: string;
    }[];
}

async function getDetails(mediaType: string, id: string) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${mediaType}/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
            { next: { revalidate: 3600 } } // Cache for 1 hour
        );

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching details:", error);
        return null;
    }
}

export async function generateMetadata({ params }: any) {
    const { mediaType, id } = await params;
    const data = await getDetails(mediaType, id);

    if (!data) {
        return {
            title: "Not Found",
            description: "The requested content could not be found.",
        };
    }

    const title = mediaType === "movie" ? data.title : data.name;

    return {
        title: `Watch ${title} | Movine`,
        description: data.overview,
        openGraph: {
            title: `Watch ${title} | Movine`,
            description: data.overview,
            images: [
                `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/w500${data.poster_path}`,
            ],
        },
    };
}

export default async function WatchPage({ params, searchParams }: any) {
    const { mediaType, id } = await params;
    const { s, e } = await searchParams;
    const data = await getDetails(mediaType, id);

    if (!data) {
        notFound();
    }

    // Parse season and episode from URL or use defaults
    const currentSeason = parseInt((s as string) || "1");
    const currentEpisode = parseInt((e as string) || "1");

    // Validate season and episode numbers for TV shows
    if (mediaType === "tv") {
        const tvData = data as TVShowDetails;
        const maxSeason = tvData.seasons.length;
        const maxEpisode =
            tvData.seasons.find((s) => s.season_number === currentSeason)
                ?.episode_count || 0;

        if (currentSeason > maxSeason || currentSeason < 1) {
            notFound();
        }

        if (currentEpisode > maxEpisode || currentEpisode < 1) {
            notFound();
        }
    }

    return (
        <Watch
            details={data}
            mediaType={mediaType}
            currentSeason={currentSeason}
            currentEpisode={currentEpisode}
        />
    );
}
