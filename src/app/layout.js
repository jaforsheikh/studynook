import "./globals.css";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export const metadata = {
  title: "StudyNook",
  description: "Premium Study Room Booking Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#06110e] text-white">
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}