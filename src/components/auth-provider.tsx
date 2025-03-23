"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "@/lib/store";
import { auth } from "@/lib/firebase";
import { loggedIn, loggedOut } from "@/features/user/userSlice";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(
                    loggedIn({
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        uid: user.uid,
                    })
                );
            } else {
                dispatch(loggedOut());
            }
        });

        return () => unsubscribe();
    }, [dispatch]);

    return <>{children}</>;
}
