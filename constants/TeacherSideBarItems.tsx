import { SideBarItem } from "@/types/SideNavItems";
import { School, User, MessagesSquare } from "lucide-react";


export const TeacherSideBarItems: SideBarItem[] = [
  {
    id: "1",
    text: "Classroom",
    icon: <School size={30} />,
    path: "/teacher/classroom/listOfClassrooms",
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
    icon: <MessagesSquare size={30} />,
    path: "/",
  },
];