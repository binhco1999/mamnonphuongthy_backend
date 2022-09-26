import CreateBackgroundDto from './dtos/create_background.dto';
import { HttpException } from '~/core/exceptions';
import { IPagination } from '~/core/interfaces';
import { IBackground } from './background.interface';
import { BackgroundSchema } from '.';
import { UserSchema } from '~/modules/users';

export default class BackgroundService {
    public async createBackground(
        userId: string,
        backgroundDto: CreateBackgroundDto,
    ): Promise<IBackground> {
        const user = await UserSchema.findById(userId)
            .select('-password')
            .exec();
        if (!user) throw new HttpException(400, 'User id is not exist');

        const newBackground = new BackgroundSchema({
            urlimg: backgroundDto.urlimg,
            name: user.first_name + ' ' + user.last_name,
            avatar: user.avatar,
            user: userId,
        });
        const background = await newBackground.save();
        return background;
    }

    public async updateBackground(
        backgroundId: string,
        backgroundDto: CreateBackgroundDto,
    ): Promise<IBackground> {
        const updateBackgroundById = await BackgroundSchema.findByIdAndUpdate(
            backgroundId,
            {
                ...backgroundDto,
            },
            { new: true },
        ).exec();

        if (!updateBackgroundById)
            throw new HttpException(400, 'Background is not found');

        return updateBackgroundById;
    }

    public async getAllBackgrounds(): Promise<IBackground[]> {
        const backgrounds = await BackgroundSchema.find()
            .sort({ date: -1 })
            .exec();
        return backgrounds;
    }

    public async deleteBackground(
        userId: string,
        backgroundId: string,
    ): Promise<IBackground> {
        const background = await BackgroundSchema.findById(backgroundId).exec();
        if (!background) throw new HttpException(404, 'Background not found');
        if (background.user.toString() !== userId)
            throw new HttpException(400, 'User is not authorized');
        await background.remove();
        return background;
    }
}
