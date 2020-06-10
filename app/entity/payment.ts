import { Order } from "./order";
import { User } from "./user";

export class Payment{
    id: string;
    name: string;
    sum: number;
    orderId: number;
    userId: number;
    
    constructor(){
        console.log("New Payment():::::")
        
    }
}