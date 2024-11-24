import { Inter, Roboto, Roboto_Mono, Rochester } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import MobileNavbar from "./components/navbar-mobile";
import MobileFooter from "./components/footer";
import { Providers } from "./providers"
import CustomToaster from "./components/common/CustomToaster";
import Loading from "./loading";

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
})

const rochester = Rochester({
  subsets: ['latin'],
  weight: ['400',],
  display: 'swap',
  variable: '--font-rochester'
})

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-roboto-mono'
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-roboto'
})

export const metadata = {
  title: "Nilaa Trends",
  description: "Nilaa - The Stories of Threads",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${inter.variable} ${roboto.variable} ${rochester.variable} ${roboto_mono.variable} font-sans`}>
        <CustomToaster />
        {/* <Loading/> */}
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
