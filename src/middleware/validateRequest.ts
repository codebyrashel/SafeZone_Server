import { Response, Request, NextFunction } from "express";
import z from "zod";

export const validateRequest = (zodobject: z.ZodObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const parsedResult = zodobject.safeParse(req.body);

    if(!parsedResult.success){
        next(parsedResult.error)
    }

    //Sanitizing the data
    req.body = parsedResult.data;

    next()
    }
};