import { SideBarItem } from "@/types/SideNavItems";
import { School, User, UsersRound } from "lucide-react";


export const AdminSideBarItems: SideBarItem[] = [
  {
    id: "1",
    text: "Classroom",
    icon: <School size={30} />,
    path: "/",
  },
  {
    id: "2",
    text: "Profile",
    icon: <User size={30} />,
    path: "/",
  },
  {
    id: "3",
    text: "Messages",
    icon: <UsersRound size={30} />,
    path: "/",
  },
];