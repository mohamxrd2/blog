import { MessagesSquare } from "lucide-react";
import Container from "./Container";
import { ModeToggle } from "./ui/mode-teme";
import SearchInput from "./ui/SearchInput";
import Notification from "./ui/notification";
import UserButton from "./UserButton";

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b bg-background text-foreground">
      <Container>
        <div className="flex items-center justify-between gap-8 py-2">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <MessagesSquare className="w-8 h-8 text-orange-500" />
            <div className="text-xl font-bold">Blog dev</div>
          </div>

          {/* Search */}
          <div className="relative hidden sm:block">
            <SearchInput />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 sm:gap-5">
            <ModeToggle />
            <Notification />
            <UserButton />
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default NavBar;
