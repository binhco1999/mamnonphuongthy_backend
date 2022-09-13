import { NextFunction, Request, Response } from 'express';

export default class IndexController {
    // tách ra để overide lại ở từng phương thức
    public index = (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).send('API is running...');
        } catch (error) {
            //có lỗi xảy ra thì next tới middleware tiếp theo xử lý
            next(error);
        }
    };
}
