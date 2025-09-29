"use client"
import { Header } from "@/components/container/Header";



export default function RoutesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="w-full h-full">
            <Header />
            {children}
        </div>
    );
}
