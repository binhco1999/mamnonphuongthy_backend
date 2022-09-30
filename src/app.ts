import { Logger } from '~/core/utils';
import { Route } from '~/core/interfaces';
import cors from 'cors';
import { errorMiddleware } from '~/core/middleware';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import mongoose from 'mongoose';
import morgan from 'morgan';

class App {
    public app: express.Application;
    public port: string | number;
    public production: boolean;

    constructor(routes: Route[]) {
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.production = process.env.NODE_ENV == 'production' ? true : false;

        this.connectToDatabase();
        this.initializeMiddleware();
        this.initializeRoutes(routes);
        this.initializeErrorMiddleware();
    }

    public listen() {
        this.app.listen(this.port, () => {
            Logger.info(`Server is listening on port ${this.port}`);
        });
    }

    private initializeRoutes(routes: Route[]) {
        routes.forEach((route) => {
            this.app.use('/', route.router);
        });
    }

    private initializeMiddleware() {
        var whitelist = [
            'http://localhost:3000',
            'http://localhost:3001',
            'https://mamnonphuongthy.vercel.app',
            'https://mamnonphuongthy.surge.sh',
            'https://mamnonphuongthy-quanly.vercel.app',
        ];
        var corsOptions = {
            origin: function (origin: any, callback: any) {
                if (whitelist.indexOf(origin) !== -1 || !origin) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS'));
                }
            },
        };
        if (this.production) {
            this.app.use(hpp());
            this.app.use(helmet());
            this.app.use(morgan('combined'));
            this.app.use(cors(corsOptions));
        } else {
            this.app.use(morgan('dev'));
            this.app.use(cors({ origin: true, credentials: true }));
        }
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }
    private initializeErrorMiddleware() {
        this.app.use(errorMiddleware);
    }

    private connectToDatabase() {
        const connectString = process.env.MONGODB_URI;
        if (!connectString) {
            Logger.error('Connection string is invalid');
            return;
        }
        mongoose.connect(connectString, {}).catch((reason) => {
            Logger.error(reason);
        });
        Logger.info('Database connected...');
    }
}

export default App;
