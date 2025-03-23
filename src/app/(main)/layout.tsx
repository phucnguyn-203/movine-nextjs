"use client";

import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";

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
