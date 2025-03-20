import { UserNav } from "./user-nav";
import { SheetMenu } from "./sheet-menu";
import { BellDot } from "lucide-react";
interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-[75px] items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <div className="flex items-center space-x-4">
            <h1 className="font-bold text-[24px]">{title} </h1>
            <div className="h-5 w-5 bg-[#F2FAFF] text-[#039BF0] flex items-center justify-center rounded-full">
              11
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <BellDot />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
