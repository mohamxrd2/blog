import { Search } from "lucide-react";
import { Input } from "./input";

const SearchInput = () => {
    return ( 
        <div>
            <Search className="absolute top-3 left-4 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Recherche..." className="pl-10" />
        </div>
     );
}
 
export default SearchInput;