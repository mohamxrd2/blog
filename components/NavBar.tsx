"use client";

import { MessagesSquare } from "lucide-react";
import Container from "./Container";
import { ModeToggle } from "./ui/mode-teme";
import SearchInput from "./ui/SearchInput";
import Notification from "./ui/notification";
import UserButton from "./UserButton";
import Link from "next/link";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const session = useSession();
  const isLoggedIn = session.status === "authenticated";
  const path = usePathname();

  useEffect(() => {
    if (!isLoggedIn && path) {
      const updateSession = async () => {
        await session.update();
      };
      updateSession();
    }
  }, [path, isLoggedIn, session]);

  console.log("session: ", session);

  return (
    <nav className="sticky top-0 z-50 border-b bg-background text-foreground">
      <Container>
        <div className="flex items-center justify-between gap-8 py-2">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
          >
            <MessagesSquare className="w-8 h-8 text-orange-500" />
            <span className="text-xl font-bold">Blog Dev</span>
          </Link>

          {/* Search */}
          <div className="relative hidden sm:block">
            <SearchInput />
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <ModeToggle />
            {isLoggedIn ? (
              <>
                <Notification />
                <UserButton />
              </>
            ) : (
              <div className="flex gap-2">
                <Link href="/login">
                  <Button variant="outline" className="text-sm">
                    Se connecter
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="text-sm">S&apos;inscrire</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default NavBar;
