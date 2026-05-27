import { Home, Users, Clipboard, AlertTriangle } from "lucide-react";

export const menuItems = [
    { name: "Dashboard", to: "/", icon: Home },
    { name: "Utilisateurs", to: "/utilisateurs", icon: Users },
    { name: "Missions", to: "/missions", icon: Clipboard },
    { name: "Logs erreurs", to: "/logs", icon: AlertTriangle },
];