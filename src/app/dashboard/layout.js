import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import RequireAuth from "@/components/auth/RequireAuth";

export default function DashboardLayout({ children }) {
  return (
    <RequireAuth>
      <div className="flex min-h-screen bg-[#06110e] text-white">
        <DashboardSidebar />

        <div className="min-w-0 flex-1">
          <DashboardTopbar />

          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </RequireAuth>
  );
}