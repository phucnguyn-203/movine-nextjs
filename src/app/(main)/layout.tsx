"use client";

import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-black">
            <Header />
            <div className="mt-[64px]">{children}</div>
            <Footer />
            <ScrollToTop />
        </div>
    );
}
