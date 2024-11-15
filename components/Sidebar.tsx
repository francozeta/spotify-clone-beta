"use client"

import { usePathname } from "next/navigation"
import { FC, useMemo } from "react"

import { HiHome, } from 'react-icons/hi'
import { BiMicrophone, BiSearch } from 'react-icons/bi'
import { Box } from "./Box"
import Library from "./Library"
import SidebarItem from "./SidebarItem"
import { Song } from "@/types"
import { twMerge } from "tailwind-merge"
import usePlayer from "@/hooks/usePlayer"
import { Mic } from 'lucide-react'

interface SidebarProps {
  children: React.ReactNode;
  songs: Song[];
}

const Sidebar: FC<SidebarProps> = ({
  children,
  songs
}) => {
  const pathname = usePathname()
  const player = usePlayer();

  const routes = useMemo(() => [
    {
      icon: HiHome,
      label: 'Home',
      active: pathname === '/',
      href: '/'
    },
    {
      icon: BiSearch,
      label: 'Search',
      active: pathname === '/search',
      href: '/search'
    },
    {
      icon: BiMicrophone,
      label: 'Recognition',
      active: pathname === '/recognition',
      href: '/recognition'
    }
  ], [pathname]);

  return (
    <div className={twMerge(`
      flex h-full`, player.activeId && "h-[calc(100%-80px)]")}>
      <div
        className="
        hidden 
        md:flex 
        flex-col 
        gap-y-2 
        bg-black 
        h-full 
        w-[300px] 
        p-2
      "
      >
        <Box>
          <div
            className="
              flex
              flex-col
              gap-y-4
              px-5
              py-4
            "
          >
            {routes.map((item) => (
              <SidebarItem
                key={item.label}
                {...item}
              />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">
        {children}
      </main>
    </div>
  )
}

export default Sidebar;