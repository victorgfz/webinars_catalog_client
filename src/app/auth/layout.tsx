import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (<main className="max-w-3xl h-screen overflow-hidden p-4 mx-auto flex items-center justify-center">

        {children}
    </main>)
}