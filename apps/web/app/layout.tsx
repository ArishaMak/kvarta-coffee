import "./globals.css";
import { CartProvider } from "../src/context/CartContext";
import { CartDrawer } from "../src/components/ui/CartDrawer";

export const metadata = {
  title: "Кварта — Обжарочная мастерская в Минске",
  description: "Свежеобжаренный спешелти кофе с доставкой по Беларуси",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
