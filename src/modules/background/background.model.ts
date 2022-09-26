import mongoose, { Document } from 'mongoose';

import { IBackground } from './background.interface';

const BackgroundSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    urlimg: {
        type: String,
    },
    name: {
        type: String,
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
export default mongoose.model<IBackground & Document>(
    'background',
    BackgroundSchema,
);
