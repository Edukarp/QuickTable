"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon } from "lucide-react";

const Search = () => {
    return (  
        <div className="flex items-center gap-3">
            <Input placeholder="Busque por um restaurante" />
            <Button variant="default" size="icon">
                <SearchIcon size={20}/>
            </Button>

        </div>
    );
}
 
export default Search;