import { Home, Users, FileText, Flag, Clipboard } from "lucide-react";

export const menuItems = [
    { name: "Dashboard", to: "/", icon: Home },
    { name: "Utilisateurs", to: "/utilisateurs", icon: Users },
    { name: "Missions", to: "/missions", icon: Clipboard },
    { name: "Documents", to: "/documents", icon: FileText },
    { name: "Signalements", to: "/signalements", icon: Flag },
];