import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#06110e]">
      {/* SIDEBAR */}
      <DashboardSidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1">
        <DashboardTopbar />

        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}