"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";

const Notification = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <button className="relative group p-2 rounded-full hover:bg-muted transition-colors duration-200">
  <div className="absolute -top-1 -right-1 bg-rose-600 h-5 w-5 rounded-full flex items-center justify-center text-xs text-white font-semibold shadow-md group-hover:scale-110 transition-transform">
    5
  </div>
  <Bell size={24} className="text-foreground transition-colors group-hover:text-primary" />
</button>

      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[320px] p-2">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-lg">Notifications</h3>
          <button className="text-sm text-primary hover:underline">
            Mark all as read
          </button>
        </div>

        {/* Exemple de notification */}
        <div className="space-y-2">
          <div className="p-2 rounded-md hover:bg-muted cursor-pointer">
            <p className="text-sm">You have a new message!</p>
            <span className="text-xs text-muted-foreground">2 minutes ago</span>
          </div>
          <div className="p-2 rounded-md hover:bg-muted cursor-pointer">
            <p className="text-sm">Your post has been liked.</p>
            <span className="text-xs text-muted-foreground">10 minutes ago</span>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notification;
