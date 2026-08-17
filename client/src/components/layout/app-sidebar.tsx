/* eslint-disable prettier/prettier */
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Code2,
  ListChecks,
  Trophy,
  CalendarClock,
  BookOpen,
  Settings,
  Sparkles,
  History,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Problems",
    url: "/problems",
    icon: Code2,
  },
  {
    title: "Interviews",
    url: "/interviews",
    icon: CalendarClock,
  },
];

const progressItems = [
  {
    title: "Interview History",
    url: "/interview-history",
    icon: History,
  },
];

const learnItems = [
  {
    title: "AI Mentor",
    url: "/dashboard",
    icon: Sparkles,
  },
];
export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const path = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (url: string) => path === url;

  return (
  <Sidebar
  collapsible="icon"
  className="
    border-r
    border-white/[0.08]
    bg-black/95
    shadow-[8px_0_40px_-25px_rgba(255,255,255,0.12)]
  "
>
      <SidebarHeader
  className="
    border-b
    border-white/[0.06]
    px-3
    py-4
  "
>
        <Link to="/dashboard" className="flex items-center gap-2">
          <div
            className="grid h-9 w-9 place-items-center rounded-xl text-primary-foreground"
            style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elegant)" }}
          >
            <Code2 className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">AlgoForge</div>
              <div className="text-[11px] text-muted-foreground">DSA Prep Suite</div>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Practice</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
  asChild
  isActive={isActive(item.url)}
  className="
    transition-all
    duration-300
    ease-out
    hover:bg-white/[0.045]
    hover:text-white
    data-[active=true]:bg-blue-500/[0.10]
    data-[active=true]:text-blue-300
    data-[active=true]:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_20px_-10px_rgba(59,130,246,0.6)]
  "
>
                    <Link
  to={item.url}
  className="relative flex items-center gap-2"
>
  {isActive(item.url) && (
    <span
      className="
        absolute
        -left-2
        h-5
        w-[2px]
        rounded-full
        bg-blue-400
        shadow-[0_0_10px_rgba(96,165,250,0.8)]
      "
    />
  )}

  <item.icon className="h-4 w-4" />

  {!collapsed && <span>{item.title}</span>}
</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
<SidebarGroup>
  <SidebarGroupLabel>Progress</SidebarGroupLabel>

  <SidebarGroupContent>
    <SidebarMenu>
      {progressItems.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            isActive={isActive(item.url)}
            className="
              transition-all
              duration-300
              ease-out
              hover:bg-white/[0.045]
              hover:text-white
              data-[active=true]:bg-blue-500/[0.10]
              data-[active=true]:text-blue-300
              data-[active=true]:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_20px_-10px_rgba(59,130,246,0.6)]
            "
          >
            <Link
              to={item.url}
              className="relative flex items-center gap-2"
            >
              {isActive(item.url) && (
                <span
                  className="
                    absolute
                    -left-2
                    h-5
                    w-[2px]
                    rounded-full
                    bg-blue-400
                    shadow-[0_0_10px_rgba(96,165,250,0.8)]
                  "
                />
              )}

              <item.icon className="h-4 w-4" />

              {!collapsed && <span>{item.title}</span>}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  </SidebarGroupContent>
</SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Learn</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {learnItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      {!collapsed && (
                        <span className="flex w-full items-center justify-between">
                          {item.title}
                          {item.badge && (
                            <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                              {item.badge}
                            </span>
                          )}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        {!collapsed && (
          <div className="rounded-xl border border-sidebar-border bg-sidebar-accent/40 p-3 text-xs text-muted-foreground">
            <div className="mb-1 font-medium text-foreground">Pro tip</div>
            Consistency beats intensity. Solve one problem daily.
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
