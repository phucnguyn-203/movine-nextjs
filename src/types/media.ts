export interface Movie {
    id: any;
    title: any;
    poster_path: string;
    vote_average: number;
    release_date: string;
}

export interface TVShow {
    id: number;
    name: string;
    poster_path: string;
    vote_average: number;
    first_air_date: string;
}

export type MediaType = "movie" | "tv";
