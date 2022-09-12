import mongoose from "mongoose";
import IUser from "./users.interface";

const UserSchema = new mongoose.Schema({
    //Mặc định nó sẽ tạo cho mình cái _id, có thể khai báo hoặc không đều được
    first_name:{
        type: String,
        require:true 
    },      
    last_name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        unique: true,
        index: true,
        require: true
    },
    password:{
        type: String,
        require: true  
    },
    avatar:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now,
    }


})
//export sử dụng cả document của mongoose vì trong đó nó có chứa cả id nữa, đặt tên bảng là user và sử dụng cái interface của iuser
export default mongoose.model<IUser & mongoose.Document>('user', UserSchema);