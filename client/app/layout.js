import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import MobileNavbar from "./components/navbar-mobile";
import MobileFooter from "./components/footer";
import {Providers} from "./providers"


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nilaa Trends",
  description: "Nilaa - The Stories of Threads",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="hidden lg:block">
            <Navbar />
          </div>
          <div className="block lg:hidden">
            <MobileNavbar />
          </div>
          {children}
          <div className="block lg:hidden">
            <MobileFooter />
          </div>
          </Providers>
      </body>
    </html>
  );
}
