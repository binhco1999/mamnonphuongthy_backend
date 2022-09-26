import { NextFunction, Request, Response } from 'express';

import CreateBackgroundDto from './dtos/create_background.dto';
import { IBackground } from './background.interface';
import BackgroundService from './background.service';

export default class BackgroundController {
    private backgroundService = new BackgroundService();

    public createBackground = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const model: CreateBackgroundDto = req.body;
            const userId = req.user.id;
            const result = await this.backgroundService.createBackground(
                userId,
                model,
            );
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    };

    public updateBackground = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const model: CreateBackgroundDto = req.body;
            const backgroundId = req.params.id;
            const result = await this.backgroundService.updateBackground(
                backgroundId,
                model,
            );
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    public getAllBackgrounds = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const backgrounds: IBackground[] =
                await this.backgroundService.getAllBackgrounds();
            res.status(200).json(backgrounds);
        } catch (error) {
            next(error);
        }
    };

    public deleteBackground = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const backgroundId = req.params.id;
            const background = await this.backgroundService.deleteBackground(
                req.user.id,
                backgroundId,
            );
            res.status(200).json(background);
        } catch (error) {
            next(error);
        }
    };
}
