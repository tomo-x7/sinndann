import type { Metadata } from "next";
import "./globals.css";
import type { Viewport } from "next";
import { Header } from "./header";

export const viewport: Viewport = {
	width: "500",
};
export const metadata: Metadata = {
	title: "diagnosky",
	description: "Bluesky向けの診断メーカーです。",
	openGraph: {
		type: "website",
		locale: "ja_JP",
		siteName: "diagnosky",
		title: "diagnosky",
		description: "Bluesky向けの診断メーカーです。",
		images: { url: "https://diagnosky.vercel.app/ogp.png" },
	},
	icons:{icon:"/favicon.ico"},
	robots:{index:true,follow:true,}
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body>
				<div id="background" />
				<div id="vp">
					<Header />
					<main>{children}</main>
					<footer>
						developed by{" "}
						<a href="https://bsky.app/profile/did:plc:qcwvyds5tixmcwkwrg3hxgxd" target="_blank" rel="noopener noreferrer">
							@tomo-x
						</a>
						<br />
						このプロジェクトはオープンソースです。
						<a href="https://github.com/tomo-x7/diagnosky" target="_blank" rel="noopener noreferrer">
							リポジトリ
						</a>
					</footer>
				</div>
			</body>
		</html>
	);
}
