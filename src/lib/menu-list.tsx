/* eslint-disable @typescript-eslint/no-unused-vars */
import { Banknote, LucideIcon, Tag, Users } from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/verifiers",
          label: "Verifiers",
          icon: Users,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/deals",
          label: "Deals",
          icon: Tag,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/transactions",
          label: "Transactions",
          icon: Banknote,
          submenus: [],
        },
      ],
    },
  ];
}
export function getBottomMenuList(pathname: string): Group[] {
  return [
    // {
    //   groupLabel: "",
    //   menus: [
    //     {
    //       href: "/logout",
    //       label: "Logout",
    //       icon: LogOutIcon,
    //       submenus: [],
    //     },
    //   ],
    // },
  ];
}
