// src/app/layout.js
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ShopProvider from "@/contexts/ShopContext"

export const metadata = {
  title: "RPG Compendium",
  description: "Clases, Especies y Personajes",
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <ShopProvider>
          <Navbar />
          {children}
          <Footer />
        </ShopProvider>
      </body>
    </html>
  )
}
