import { Request, Response } from 'express';
export declare function handleLoginSuccess(res: Response, user: any): void;
export declare const login: (req: Request, res: Response) => Promise<void>;
