import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";


const Header = () => {
    return ( 
        <Card> 
            <CardContent className="p-5 justify-between items-center flex flex-row">
                 <Image scr="\logo.png" alt = "logoPlaceholder" width = {120} height = {22} />
                 <Button variant="otline" size="icon">
                    <MenuIcon size={18} />
                 </Button>
            </CardContent>
        </Card>
     );
}
 
export default Header;