import { FolderIcon, HomeIcon, InboxIcon } from "@heroicons/react/24/outline";
import { NavItem } from "./types";

export const navigation: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Forms", href: "/forms", icon: FolderIcon },
  { name: "Submissions", href: "/submissions", icon: InboxIcon },
];
