import mongoose from 'mongoose';
import IRecruit from './recruit.interface';

const RecruitSchema = new mongoose.Schema({
    //Mặc định nó sẽ tạo cho mình cái _id, có thể khai báo hoặc không đều được
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    position: {
        type: String,
        require: true,
    },
    count: {
        type: String,
        require: true,
    },
    condition: {
        type: String,
    },
    benefit: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
//export sử dụng cả document của mongoose vì trong đó nó có chứa cả id nữa, đặt tên bảng là user và sử dụng cái interface của iuser
export default mongoose.model<IRecruit & mongoose.Document>(
    'recruit',
    RecruitSchema,
);
