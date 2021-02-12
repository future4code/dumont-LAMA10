import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { Band, BandInputDTO } from "../business/entities/Band";
import { Authenticator } from "../business/services/Authenticator";
import { IdGenerator } from "../business/services/IdGenerator";
import { BandDatabase } from "../data/BandDatabase";

const bandBusiness = new BandBusiness(
    new IdGenerator(),
    new Authenticator(),
    new BandDatabase()
)

export class BandController {
    public registerBand = async (req: Request, res: Response): Promise<void> => {
        try {
            const token: string = req.headers.authorization as string;
            const input: BandInputDTO = {
                name: req.body.name,
                genre: req.body.genre,
                responsible: req.body.responsible,
                token: token
            }

            await bandBusiness.registerBand(input)

            res.status(201).send("Band registered with success")
        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })
        }
    }

    public getBand = async (req: Request, res: Response): Promise<void> => {
        try {
            const info = req.query.name || req.query.id

            const result: Band = await bandBusiness.getBand(String(info))

            res.status(200)
                .send(result)

        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })
        }

    }
}
