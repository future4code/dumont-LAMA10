import { Request, Response } from "express";
import { ShowInputDTO } from "../business/entities/Show";
import { Authenticator } from "../business/services/Authenticator";
import { IdGenerator } from "../business/services/IdGenerator";
import { ShowBusiness } from "../business/ShowBusiness";
import { ShowDatabase } from "../data/ShowDatabase";

const showBusiness = new ShowBusiness(
    new IdGenerator(),
    new Authenticator(),
    new ShowDatabase()
)

export class ShowController {

    public createShow = async (req: Request, res: Response): Promise<void> => {
        try {
            const token: string = req.headers.authorization as string
            const input: ShowInputDTO = {
                bandId: req.body.bandId,
                weekDay: req.body.weekDay,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                token: token
            }

            await showBusiness.createShow(input)

            res.status(201).send({ message: "Show created" })
        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })
        }
    }

    public getShowByDay = async (req: Request, res: Response): Promise<void> => {
        try {
          const day = String(req.query.day).toUpperCase();
          const result = await showBusiness.getShowByDay(day);
    
          res.status(200).send({ result })
        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })
        }
      }

}