import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
	variable: "--font-display",
	subsets: ["latin"],
	weight: ["400", "600", "700"],
});

const ui = DM_Sans({
	variable: "--font-ui",
	subsets: ["latin"],
	weight: ["400", "500", "600"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Kolam Art Studios",
	description: "Generate beautiful traditional South Indian geometric patterns",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${display.variable} ${ui.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
