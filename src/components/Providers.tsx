"use client";

import { Provider } from "react-redux";
import { makeStore } from "@/lib/store";

const store = makeStore();

export function Providers({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}
