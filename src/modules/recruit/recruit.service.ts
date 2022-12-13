// import { DataStoredInToken } from './../auth/auth.interface';
// import { Http } from 'winston/lib/winston/transports';
// import { HttpException } from '~/core/exceptions';
// import { IPagination } from '~/core/interfaces';
// import IUser from './recruit.interface';
// import CreateRecruitDto from './dtos/create_recruit.dto';
// import { TokenData } from '~/modules/auth';
// import RecruitSchema from './recruit.model';
// import bcryptjs from 'bcryptjs';
// import gravatar from 'gravatar';
// import { isEmptyObject } from '~/core/utils';
// import jwt from 'jsonwebtoken';

// class RecruitService {
//     public recruitSchema = RecruitSchema;

//     public async createRecruit(model: CreateRecruitDto): Promise<TokenData> {
//         if (isEmptyObject(model)) {
//             throw new HttpException(400, 'Model is empty');
//         }

//         const recruit = await this.recruitSchema
//             .findOne({ email: model.email })
//             .exec();
//         if (user) {
//             throw new HttpException(
//                 409,
//                 `Your email ${model.email} already exist.`,
//             );
//         }

//         const avatar = gravatar.url(model.email!, {
//             size: '200',
//             rating: 'g',
//             default: 'mm',
//         });

//         const salt = await bcryptjs.genSalt(10);

//         const hashedPassword = await bcryptjs.hash(model.password!, salt);
//         const createdUser = await this.userSchema.create({
//             ...model,
//             password: hashedPassword,
//             avatar: avatar,
//             date: Date.now(),
//         });
//         return this.createToken(createdUser);
//     }

//     public async updateUser(
//         userId: string,
//         model: RegisterDto,
//     ): Promise<IUser> {
//         if (isEmptyObject(model)) {
//             throw new HttpException(400, 'Model is empty');
//         }

//         const user = await this.userSchema.findById(userId).exec();
//         if (!user) {
//             throw new HttpException(400, `User id is not exist`);
//         }

//         let avatar = user.avatar;
//         if (user.email === model.email) {
//             throw new HttpException(400, 'You must using the difference email');
//         }

//         const checkEmailExist = await this.userSchema
//             .find({
//                 $and: [
//                     { email: { $eq: model.email } },
//                     { _id: { $ne: userId } },
//                 ],
//             })
//             .exec();
//         if (checkEmailExist.length !== 0) {
//             throw new HttpException(
//                 400,
//                 'Your email has been used by another user',
//             );
//         }

//         avatar = gravatar.url(model.email!, {
//             size: '200',
//             rating: 'g',
//             default: 'mm',
//         });

//         let updateUserById;
//         if (model.password) {
//             const salt = await bcryptjs.genSalt(10);
//             const hashedPassword = await bcryptjs.hash(model.password, salt);
//             updateUserById = await this.userSchema
//                 .findByIdAndUpdate(
//                     userId,
//                     {
//                         ...model,
//                         avatar: avatar,
//                         password: hashedPassword,
//                     },
//                     { new: true },
//                 )
//                 .exec();
//         } else {
//             updateUserById = await this.userSchema
//                 .findByIdAndUpdate(
//                     userId,
//                     {
//                         ...model,
//                         avatar: avatar,
//                     },
//                     { new: true },
//                 )
//                 .exec();
//         }

//         if (!updateUserById)
//             throw new HttpException(409, 'You are not an user');

//         return updateUserById;
//     }

//     public async getUserById(userId: string): Promise<IUser> {
//         const user = await this.userSchema.findById(userId).exec();
//         if (!user) {
//             throw new HttpException(404, `User is not exists`);
//         }
//         return user;
//     }

//     public async getAll(): Promise<IUser[]> {
//         const users = await this.userSchema.find().exec();
//         return users;
//     }

//     public async getAllPaging(
//         keyword: string,
//         page: number,
//     ): Promise<IPagination<IUser>> {
//         const pageSize: number = Number(process.env.PAGE_SIZE || 10);

//         let query = {};
//         if (keyword) {
//             query = {
//                 $or: [
//                     { email: keyword },
//                     { first_name: keyword },
//                     { last_name: keyword },
//                 ],
//             };
//         }

//         const users = await this.userSchema
//             .find(query)
//             .skip((page - 1) * pageSize)
//             .limit(pageSize)
//             .exec();

//         const rowCount = await this.userSchema
//             .find(query)
//             .countDocuments()
//             .exec();

//         return {
//             total: rowCount,
//             page: page,
//             pageSize: pageSize,
//             items: users,
//         } as IPagination<IUser>;
//     }

//     public async deleteUser(userId: string): Promise<IUser> {
//         const deletedUser = await this.userSchema
//             .findByIdAndDelete(userId)
//             .exec();
//         if (!deletedUser) throw new HttpException(409, 'Your id is invalid');
//         return deletedUser;
//     }
//     public async deleteUsers(userIds: string[]): Promise<number | undefined> {
//         const result = await this.userSchema
//             .deleteMany({ _id: [...userIds] })
//             .exec();
//         if (!result) throw new HttpException(409, 'Your id is invalid');
//         return result.deletedCount;
//     }

//     private createToken(user: IUser): TokenData {
//         const dataInToken: DataStoredInToken = { id: user._id };
//         const secret: string = process.env.JWT_TOKEN_SECRET!;
//         const expiresIn: number = 3600;
//         return {
//             token: jwt.sign(dataInToken, secret, { expiresIn: expiresIn }),
//         };
//     }
// }
// export default UserService;
