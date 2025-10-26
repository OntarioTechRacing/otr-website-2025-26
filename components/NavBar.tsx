"use client";

import {useEffect, useState} from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"


function NavBar() {

    const [isVisible, setIsVisible] = useState(true); //set visibility of navbar
    const pathName = usePathname();

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const controlNavbar = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) { //scrolling down is positive
                setIsVisible(false);
            }
            else {
                setIsVisible(true);
            }

            lastScrollY = currentScrollY;
        }

        window.addEventListener("scroll", controlNavbar);

        return () => window.removeEventListener("scroll", controlNavbar);
    }, []);


    return(
        <nav className={`fixed w-full bg-white transition-transform duration-400
        z-50 ${ isVisible ? "translate-y-0": "-translate-y-full"}`}>
        <NavigationMenu>
            <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuLink href="/">Home</NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
                <NavigationMenuLink href="/Team">Team</NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
                <NavigationMenuLink href="/OurCar">Our Car</NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
                <NavigationMenuLink href="/JoinUs">Join Us</NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
                <NavigationMenuLink href="/History">History</NavigationMenuLink>
            </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu>
        </nav>
    );
}

export default NavBar;
