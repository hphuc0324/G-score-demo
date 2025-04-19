import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Outlet, useLocation } from "react-router-dom";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  ChartBarBig,
  ChartNoAxesCombined,
} from "lucide-react";
import { cn } from "@/lib/utils";
import PcSidebar from "@/components/pc-sidebar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
