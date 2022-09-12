import { IsNotEmpty, IsEmail, MinLength } from "class-validator";

//vì muốn xử lý cho validation sau này nên ta dùng class


export default class LoginDto{
    constructor(first_name:string, last_name:string, email:string, password:string){
        this.email = email;
        this.password = password;
    }
    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @MinLength(6)
    public password: string;

}