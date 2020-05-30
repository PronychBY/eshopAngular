import { Product } from "./product";
import { User } from "./user";

export class Order{
    id: string;
    name: string;
    phone: string;
    address: string;
    products: Product[];
    user: User;
    constructor(){
        console.log("New Order():::::")
        
    }
}