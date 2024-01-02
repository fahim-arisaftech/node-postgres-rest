import express, { Request, Response } from "express";
import { Banker } from "../entities/Banker";
import { getRepository } from "typeorm";


const router = express.Router();

router.get("/bankers", async (_req: Request, res: Response) => {
    try {
        const bankers = await getRepository(Banker).find();
        return res.status(200).json(bankers);
    } catch (error) {
        return res.send(error)
    }
})

router.post("/banker", async (req: Request, res: Response) => {
    try {
        const { username, email, password, firstname, lastname, card_number, employee_number } = req.body;

        const banker = Banker.create({
            username,
            email,
            password,
            firstname,
            lastname,
            card_number,
            employee_number
        });

        await banker.save();

        return res.status(200).json(banker);    
    } catch (error) {
        return res.send(error);
    }
})

export default router;