"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero({ data }: { data: any }) {
    console.log(data);
    return (
        <div className="relative h-[80vh] w-full overflow-hidden">
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0"
            >
                <Image
                    src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
                    alt={`${
                        data.title || data.name || "Untitled"
                    } backdrop image`}
                    fill
                    className="object-cover"
                    priority
                    quality={100}
                />
                {/* Lighter gradient overlays for better visibility */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40" />
                {/* Subtle radial gradient for depth */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
            </motion.div>
            <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-0">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="w-full lg:w-1/2"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="flex flex-wrap items-center gap-3 mb-4"
                            >
                                <div className="flex items-center gap-2 bg-[#ed1045]/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#ed1045]/30">
                                    <svg
                                        className="w-4 h-4 sm:w-5 sm:h-5 text-[#ed1045]"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-white text-sm sm:text-lg">
                                        {typeof data.vote_average ===
                                            "number" &&
                                        !isNaN(data.vote_average)
                                            ? data.vote_average.toFixed(1)
                                            : "N/A"}
                                    </span>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20">
                                    <span className="text-gray-300 text-sm sm:text-lg">
                                        {data.release_date
                                            ? new Date(
                                                  data.release_date
                                              ).getFullYear()
                                            : new Date(
                                                  data.first_air_date
                                              ).getFullYear()}
                                    </span>
                                </div>
                            </motion.div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                                {data.title || data.name || "Untitled"}
                            </h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 line-clamp-2 sm:line-clamp-3"
                            >
                                {data.overview}
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                                className="flex flex-wrap gap-3 sm:gap-4"
                            >
                                <Link
                                    href={
                                        data.media_type === "data"
                                            ? `/watch/data/${data.id}`
                                            : `/watch/tv/${data.id}/season/1/episode/1`
                                    }
                                    className="group inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-[#ed1045] text-white rounded-lg hover:bg-[#ff1a5c] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#ed1045]/30 text-sm sm:text-base"
                                >
                                    <svg
                                        className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:scale-110 transition-transform duration-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span>Watch Now</span>
                                </Link>
                                <Link
                                    href={`/details/${data.media_type}/${data.id}`}
                                    className="group inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20 text-sm sm:text-base"
                                >
                                    <span>View Info</span>
                                    <svg
                                        className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </Link>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="hidden lg:block w-[200px] sm:w-[250px] h-[280px] sm:h-[360px] relative rounded-lg overflow-hidden shadow-2xl shadow-black/50"
                        >
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                                alt={`${
                                    data.title || data.name || "Untitled"
                                } poster image`}
                                fill
                                className="object-cover transform hover:scale-105 transition-transform duration-500"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
