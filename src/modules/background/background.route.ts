import CreateBackgroundDto from './dtos/create_background.dto';
import BackgroundController from './background.controller';
import { Route } from '~/core/interfaces';
import { Router } from 'express';
import { authMiddleware } from '~/core/middleware';
import validationMiddleware from '~/core/middleware/validation.middleware';

export default class BackgroundRoute implements Route {
    public path = '/api/v1/backgrounds';
    public router = Router();

    public backgroundController = new BackgroundController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            this.path,
            authMiddleware,
            validationMiddleware(CreateBackgroundDto, true),
            this.backgroundController.createBackground,
        );

        this.router.put(
            this.path + '/:id',
            authMiddleware,
            validationMiddleware(CreateBackgroundDto, true),
            this.backgroundController.updateBackground,
        );

        this.router.get(this.path, this.backgroundController.getAllBackgrounds);

        this.router.delete(
            this.path + '/:id',
            authMiddleware,
            this.backgroundController.deleteBackground,
        );
    }
}
