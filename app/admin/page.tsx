'use client';

import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import clsx from "clsx";

export default function Admin() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [selected, setSelected] = useState("Users");

  return (
    <div
      className={clsx(
        "min-h-screen transition-colors",
        isDark ? "bg-zinc-950" : "bg-white"
      )}
    >
     
      <div className="grid grid-cols-3 items-center px-8 pt-5">
       
        <div />

      
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={clsx(
                  "text-lg px-8 py-6 transition-colors",
                  isDark
                    ? "bg-zinc-900 text-zinc-100 border-zinc-700 hover:bg-zinc-800"
                    : "bg-white text-zinc-900 border-zinc-300 hover:bg-zinc-100"
                )}
              >
                {selected}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="center"
              className={"min-w-[180px] !bg-zinc-900 !text-zinc-100 border border-zinc-700"}
            >
              <DropdownMenuGroup>
                {["Sponsors", "Team", "Departments"].map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => setSelected(option)}
                    className={"text-base cursor-pointer hover:bg-zinc-800 focus:bg-zinc-800"}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

       
        <div className="flex justify-end">
          <Button className="text-lg px-8 py-6 bg-blue-600 text-white hover:bg-blue-700">
            Add {selected}
          </Button>
        </div>
      </div>
    </div>
  );
}
