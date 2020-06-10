export class User{
    id: string;
    name: string;
    username: string;
    login: string;
    email: string;
    password: string;
    isadmin: boolean;
    roles :string[];
    constructor(){
        console.log("New User():::::")
        
    }
}