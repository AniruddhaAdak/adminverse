import { LayoutDashboard, Users, BarChart2, Settings, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const links = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Users, label: "Users", path: "/users" },
    { icon: BarChart2, label: "Analytics", path: "/analytics" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary text-white md:hidden hover:bg-primary/90 transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Resizable Sidebar */}
      <ResizablePanelGroup direction="horizontal" className="min-h-screen">
        <div className={cn(
          "fixed top-0 left-0 h-full z-40 transition-all duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          isCollapsed ? "w-16" : "w-64"
        )}>
          <ResizablePanel 
            defaultSize={20} 
            minSize={10} 
            maxSize={30}
            className="bg-white border-r border-gray-200 h-full"
          >
            <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              <div className={cn(
                "flex items-center gap-2 p-4 mb-4",
                isCollapsed ? "justify-center" : "px-2"
              )}>
                <div className="w-8 h-8 rounded-full bg-primary animate-pulse"></div>
                {!isCollapsed && <span className="font-semibold text-lg">SocialVerse</span>}
              </div>
              
              {/* Navigation Links */}
              <nav className="space-y-1 px-2 flex-1">
                {links.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.path;
                  
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                        "hover:scale-105",
                        isActive 
                          ? "bg-primary text-white shadow-lg" 
                          : "text-gray-600 hover:bg-gray-100"
                      )}
                    >
                      <Icon size={20} className={cn(
                        "transition-transform duration-200",
                        isActive && "rotate-12"
                      )} />
                      {!isCollapsed && <span>{link.label}</span>}
                    </Link>
                  );
                })}
              </nav>

              {/* Collapse Button */}
              <Button
                variant="ghost"
                size="icon"
                className="m-2"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              </Button>
            </div>
          </ResizablePanel>
        </div>
      </ResizablePanelGroup>
    </>
  );
};

export default Sidebar;