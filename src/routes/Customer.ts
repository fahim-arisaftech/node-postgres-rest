import express, { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Customer } from "../entities/Customer";

const router = express();

router.get("/customers", async (_req: Request, res: Response) => {
    try {
        const custRep = getRepository(Customer);
        const customers = await custRep.find({});
        return res.status(200).json(customers);
    } catch (error) {
        return res.send(error);
    }
})

router.post("/customer", async (req: Request, res: Response) => {
    try {
        const { username, email, password, firstname, lastname, card_number } = req.body;

        console.log(req.body);

        const customer = Customer.create({
            username,
            email,
            password,
            firstname,
            lastname,
            card_number
        })

        await customer.save();
        return res.status(200).json(customer);
    } catch (error) {
        return res.send(error);
    }
})

export default router;