import "express";

export interface JwtUserPayload{
    sub: string;
    email:string;
    displayName?:string;
}

declare module "express-serve-static-core"{
    interface Request{
        auth?: JwtUserPayload;
    }
}