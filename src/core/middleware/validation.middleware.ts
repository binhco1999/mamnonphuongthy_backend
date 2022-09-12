import { RequestHandler, Response, Request, NextFunction } from "express";
import { validate,ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";
import { Logger } from "../utils";
import { HttpException } from "../exceptions";

const validationMiddleware = (type: any, skipMissingProperties = false):RequestHandler =>{
    return (req:Request, res: Response, next:NextFunction)=>{
        validate(plainToInstance(type, req.body),{skipMissingProperties}).then((errors: ValidationError[])=>{
            if(errors.length >0){
                Logger.error(errors);
                const messages = errors.map((error:ValidationError)=>{
                    return Object.values(error.constraints!)
                }).join(", ");
                next(new HttpException(400, messages))
            }
        });
    }
}
export default validationMiddleware;