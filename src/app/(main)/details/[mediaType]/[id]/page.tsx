import { Metadata } from "next";
import { notFound } from "next/navigation";
import Detail from "./Detail";

type Props = {
    params: {
        mediaType: string;
        id: string;
    };
    searchParams?: Record<string, string | string[] | undefined>;
};

async function getDetails(mediaType: string, id: string) {
    try {
        const [detailsResponse, creditsResponse] = await Promise.all([
            fetch(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${mediaType}/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
                { next: { revalidate: 3600 } } // Cache for 1 hour
            ),
            fetch(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${mediaType}/${id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
                { next: { revalidate: 3600 } } // Cache for 1 hour
            ),
        ]);

        if (!detailsResponse.ok || !creditsResponse.ok) {
            throw new Error("Failed to fetch data");
        }

        const [detailsData, creditsData] = await Promise.all([
            detailsResponse.json(),
            creditsResponse.json(),
        ]);

        return {
            details: detailsData,
            cast: creditsData.cast.slice(0, 6),
        };
    } catch (error) {
        console.error("Error fetching details:", error);
        return null;
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const data = await getDetails(params.mediaType, params.id);

    if (!data) {
        return {
            title: "Not Found",
            description: "The requested content could not be found.",
        };
    }

    const title =
        params.mediaType === "movie" ? data.details.title : data.details.name;

    return {
        title: `${title} | Movine`,
        description: data.details.overview,
        openGraph: {
            title: `${title} | Movine`,
            description: data.details.overview,
            images: [
                `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/w500${data.details.poster_path}`,
            ],
        },
    };
}

export default async function DetailsPage({ params }: Props) {
    const data = await getDetails(params.mediaType, params.id);

    if (!data) {
        notFound();
    }

    return (
        <Detail
            details={data.details}
            cast={data.cast}
            mediaType={params.mediaType}
        />
    );
}
