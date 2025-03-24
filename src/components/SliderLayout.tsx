"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";

export function SliderLayout({ data }: { data: any }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <div className="relative">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={2}
                    navigation={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 5,
                        },
                    }}
                    loop={true}
                    className="relative"
                >
                    {data.map((item: any) => (
                        <SwiperSlide key={item.id}>
                            <Link
                                href={`/details/${item.media_type}/${item.id}`}
                                className="group block"
                            >
                                <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                        alt={`${
                                            item.title ||
                                            item.name ||
                                            "Untitled"
                                        } poster image`}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <h3 className="text-white font-semibold text-sm sm:text-base line-clamp-2">
                                                {item.title}
                                            </h3>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="flex items-center gap-1 bg-[#ed1045]/20 backdrop-blur-sm px-2 py-1 rounded-full border border-[#ed1045]/30 text-xs">
                                                    <svg
                                                        className="w-3.5 h-3.5 text-[#ed1045]"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    {item.vote_average.toFixed(
                                                        1
                                                    )}
                                                </span>
                                                <span className="bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full border border-white/20 text-xs">
                                                    {item.release_date
                                                        ? new Date(
                                                              item.release_date
                                                          ).getFullYear()
                                                        : new Date(
                                                              item.first_air_date
                                                          ).getFullYear()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </motion.div>
    );
}
