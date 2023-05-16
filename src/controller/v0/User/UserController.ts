import { Request, Response, NextFunction } from "express";

class Users {
    public async newUser(req: Request, res: Response) {}

    public async fetchUser(req: Request, res: Response) {}

    public async updateUser(req: Request, res: Response) {}

    public async deleteUser(req: Request, res: Response) {}

    public async getAll(req: Request, res: Response) {}
}


const userController = new Users();
export default userController;