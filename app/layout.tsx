import type {Metadata} from "next";
import {ThemeProvider} from "next-themes";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Pan Pawel - blog osobisty",
    description: "Mój personalny notatnik",
};


export default function RootLayout({
                                       children,header
                                   }: Readonly<{
    children: React.ReactNode;
    header: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={`font-poppins antialiased [font-synthesis-weight:none] [font-synthesis-style:none]`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
        >
          <div className={'w-full flex flex-col items-center'}>
              {header}
            <main className="flex flex-col w-full max-w-[1400px] box-border ">
              {children}
            </main>
          </div>


        </ThemeProvider>
        </body>
        </html>
    );
}
