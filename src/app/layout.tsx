import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meta Town",
  description:
    "Meta Town is a virtual social space where you can interact with friends in real-time, chat, and join multiplayer video meetings. Jump in and start your metaverse experience now!",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
