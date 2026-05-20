import "./globals.css";
import { Toaster } from "sonner";
import LayoutShell from "@/components/shared/LayoutShell";

export const metadata = {
  title: "StudyNook",
  description: "Premium Study Room Booking Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#06110e] text-white">
        <LayoutShell>{children}</LayoutShell>

        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}