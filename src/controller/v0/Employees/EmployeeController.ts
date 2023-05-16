import { Request, Response, NextFunction } from "express";

class Employees {
    public async allEmployees(req: Request, res: Response) {}

    public async newEmployee(req: Request, res: Response) {}

    public async getEmployee(req: Request, res: Response) {}

    public async updateEmployee(req: Request, res: Response) {}

    public async deleteEmployee(req: Request, res: Response) {}
}


const employees = new Employees();
export default employees;