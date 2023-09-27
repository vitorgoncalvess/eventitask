import "./globals.css";
import { Poppins } from "next/font/google";
import { Providers } from "./providers";

const inter = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
