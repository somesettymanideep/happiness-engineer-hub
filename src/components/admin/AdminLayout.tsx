import { useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { isAdminLoggedIn, adminLogout } from "@/lib/storage";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Video, 
  Mail, 
  LogOut, 
  Home,
  Menu,
  X,
  Image
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Text Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { label: "Video Testimonials", href: "/admin/video-testimonials", icon: Video },
  { label: "Gallery", href: "/admin/gallery", icon: Image },
  { label: "Contact Messages", href: "/admin/messages", icon: Mail },
];

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    adminLogout();
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform lg:transform-none",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h1 className="text-xl font-serif font-bold text-foreground">Admin Panel</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1 bg-white">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex bg-white items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  location.pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-border space-y-2">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <Home className="w-5 h-5" />
              View Website
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors w-full"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 border-b border-border flex items-center px-4 lg:px-8 bg-card">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden mr-4"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <span className="text-muted-foreground">Welcome, Admin</span>
        </header>
        <div className="flex-1 p-4 lg:p-8 overflow-auto">{children}</div>
      </main>
    </div>
  );
};
