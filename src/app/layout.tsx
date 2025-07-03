import { Lora, Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext"; // Importar el nuevo AuthProvider
import Script from 'next/script';

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
});

export const metadata = {
  title: "CafeRegional - Café de Origen de Norte de Santander",
  description: "Descubre el auténtico sabor del café de Norte de Santander. Granos seleccionados de las mejores fincas para una experiencia única.",
  keywords: "café, norte de santander, café de origen, café premium, arboledas, durania, ragonvalia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
      </head>
      <body className={`${lora.variable} ${openSans.variable} antialiased flex flex-col min-h-screen`}>
        <AuthProvider> {/* Envolver con AuthProvider */}
          <CartProvider>
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
            <Toaster />
          </CartProvider>
        </AuthProvider>
        <Script 
          src="https://widget.cloudinary.com/v2.0/global/all.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}