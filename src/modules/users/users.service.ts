import { HttpException } from "~/core/exceptions";
import { isEmptyObject } from "~/core/utils";
import { DataStoredInToken, TokenData } from "~/modules/auth";
import RegisterDto from "./dtos/register.dto";
import UserSchema from "./users.model";
import gravatar from 'gravatar';
import bcryptjs from 'bcryptjs';
import IUser from "./users.interface";
import jwt from 'jsonwebtoken';

class UserService {
    public userSchema = UserSchema;

    //dùng async để tạo user sử dụng RegisterDto trả về đối tượng promise, promise ở đây là khi đăng ký thì trả luôn cái token data 
    public async createUser(model: RegisterDto): Promise<TokenData>{
        //kiểm tra bằng utils xem object truyền vào có bị rỗng không
        if(isEmptyObject(model)){
            throw new HttpException(400, 'Model is empty');
        }

        const user = await this.userSchema.findOne({email: model.email}); 
        if(user){
            throw new HttpException(409, `Your email ${model.email} already exist.`);
        }
        const avatar = gravatar.url(model.email!,{
            size: '200',
            rating: 'g',
            default: 'mm',
        });
        //dùng package bcryptjs để mã hóa password

        //hàm nào cần gen ra giá trị để sử dụng trong lúc async thì phải await
        const salt = await bcryptjs.genSalt(10)

        const hashedPassword = await bcryptjs.hash(model.password!, salt);
        const createdUser = await this.userSchema.create({
            ...model,   
            password: hashedPassword,
            avatar: avatar,
            date: Date.now
        });
        return this.createToken(createdUser);
        
    }
    private createToken(user:IUser): TokenData{
        const dataInToken: DataStoredInToken = {id: user._id}
        const secret: string = process.env.JWT_TOKEN_SECRET!;
        const expiresIn:number = 60;
        return {
            token: jwt.sign(dataInToken, secret, {expiresIn:expiresIn})
        }
    }
}