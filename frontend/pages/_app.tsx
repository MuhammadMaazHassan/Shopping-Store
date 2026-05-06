import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CartProvider } from "../contexts/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

function AppShell({ Component, pageProps }: AppProps) {
  const { itemCount } = useContext(CartContext) || { itemCount: 0 };

  return (
    <>
      <Navbar itemCount={itemCount} />
      <main className="page-content">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "../contexts/AuthContext";

function MyApp(props: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <CartProvider>
          <AppShell {...props} />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
