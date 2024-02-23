import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/Globalredux/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tasky",
  description: "Tasky",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
