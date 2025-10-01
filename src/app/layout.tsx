import "./globals.css";
import { Toaster } from "@/components/ui/sonner"

export const metadata = {
  title: 'Webinars Catalog - Technical Case',
  icons: '/favicon.png',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
    >
      <body

      >
        <main className="max-w-3xl h-screen p-4 mx-auto">
          {children}
        </main>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
