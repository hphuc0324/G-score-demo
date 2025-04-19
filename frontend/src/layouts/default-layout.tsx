import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { Search, ChartBarBig, ChartNoAxesCombined } from "lucide-react";
import PcSidebar from "@/components/pc-sidebar";

const items = [
  {
    title: "Search",
    url: "/",
    icon: Search,
  },
  {
    title: "Statistics",
    url: "/statistics",
    icon: ChartBarBig,
  },
  {
    title: "Top scores",
    url: "/top-scores",
    icon: ChartNoAxesCombined,
  },
];

function DefaultLayout() {
  const path = useLocation().pathname;

  console.log(path);
  return (
    <SidebarProvider className="w-full left-0 gap-0">
      <PcSidebar items={items} />
      <main className="flex-1 h-20">
        <div className="w-full h-full flex items-center px-4 gap-4">
          <SidebarTrigger className="cursor-pointer" />
          <p className="text-3xl font-semibold">G-score</p>
        </div>
        <Outlet />
      </main>
    </SidebarProvider>
  );
}

export default DefaultLayout;
