"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Reset search state when navigating to a different page
    useEffect(() => {
        setSearchQuery("");
        setShowSearch(false);
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setShowSearch(false);
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center gap-2">
                        <p className="text-3xl font-bold bg-gradient-to-r text-white bg-clip-text text-transparent">
                            MOV
                            <span className="text-[#ed1045]">INE</span>
                        </p>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            href="/"
                            className={`text-sm font-medium transition-colors ${
                                pathname === "/"
                                    ? "text-[#ed1045]"
                                    : "text-gray-400 hover:text-white"
                            }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/movies"
                            className={`text-sm font-medium transition-colors ${
                                pathname === "/movies"
                                    ? "text-[#ed1045]"
                                    : "text-gray-400 hover:text-white"
                            }`}
                        >
                            Movies
                        </Link>
                        <Link
                            href="/tvshows"
                            className={`text-sm font-medium transition-colors ${
                                pathname === "/tvshows"
                                    ? "text-[#ed1045]"
                                    : "text-gray-400 hover:text-white"
                            }`}
                        >
                            TV Shows
                        </Link>
                        <Link
                            href="/trending"
                            className={`text-sm font-medium transition-colors ${
                                pathname === "/trending"
                                    ? "text-[#ed1045]"
                                    : "text-gray-400 hover:text-white"
                            }`}
                        >
                            Trending
                        </Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowSearch(!showSearch)}
                            className="p-2 text-gray-400 hover:text-[#ed1045] transition-colors"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>
                        {/* Desktop only buttons */}
                        <div className="hidden md:flex items-center gap-4">
                            <button className="p-2 text-gray-400 hover:text-[#ed1045] transition-colors">
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                            </button>
                            <button className="p-2 text-gray-400 hover:text-[#ed1045] transition-colors">
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </button>
                        </div>
                        {/* Mobile menu button */}
                        <button
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            className="md:hidden p-2 text-gray-400 hover:text-[#ed1045] transition-colors"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                <div
                    className={`md:hidden transition-all duration-300 ease-in-out ${
                        isMobileMenuOpen
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                >
                    <nav className="py-4 space-y-4">
                        <Link
                            href="/"
                            className={`block text-sm font-medium transition-colors ${
                                pathname === "/"
                                    ? "text-[#ed1045]"
                                    : "text-gray-400 hover:text-white"
                            }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/movies"
                            className={`block text-sm font-medium transition-colors ${
                                pathname === "/movies"
                                    ? "text-[#ed1045]"
                                    : "text-gray-400 hover:text-white"
                            }`}
                        >
                            Movies
                        </Link>
                        <Link
                            href="/tvshows"
                            className={`block text-sm font-medium transition-colors ${
                                pathname === "/tvshows"
                                    ? "text-[#ed1045]"
                                    : "text-gray-400 hover:text-white"
                            }`}
                        >
                            TV Shows
                        </Link>
                        <Link
                            href="/trending"
                            className={`block text-sm font-medium transition-colors ${
                                pathname === "/trending"
                                    ? "text-[#ed1045]"
                                    : "text-gray-400 hover:text-white"
                            }`}
                        >
                            Trending
                        </Link>
                        {/* Mobile only buttons */}
                        <div className="pt-4 border-t border-gray-800 space-y-4">
                            <button className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors w-full">
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                                Favorites
                            </button>
                            <button className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors w-full">
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                Profile
                            </button>
                        </div>
                    </nav>
                </div>

                {/* Search Box */}
                <div
                    className={`transition-all duration-300 ease-in-out ${
                        showSearch
                            ? "max-h-20 opacity-100"
                            : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                >
                    <form onSubmit={handleSearch} className="py-4">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search movies and TV shows..."
                                className="w-full px-4 py-2 bg-gray-800/50 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#ed1045] placeholder-gray-400"
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </header>
    );
}
