import { Show, ShowDB } from "../business/entities/Show";
import { CustomError } from "../business/error/CustomError";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase {
    private static TABLE_NAME = "Shows_LAMA";

    // private static toShowModel(show: any): Show {
    //     return new Show(
    //         show.id,
    //         show.week_day,
    //         show.start_date,
    //         show.end_date,
    //         show.band_id
    //     )
    // }

    public async createShow(show: ShowDB): Promise<void> {
        try {
            await BaseDatabase.connection
                .insert(show)
                .into(ShowDatabase.TABLE_NAME)

        } catch (error) {
            throw new CustomError(error.statusCode, error.sqlMessage)
        }
    }

    public async getShowByDate(
        weekDay: string,
        startTime: number,
        endTime: number
      ): Promise<any> {
        try {
          const show = await BaseDatabase.connection.raw(
            `SELECT * FROM ${ShowDatabase.TABLE_NAME} WHERE week_day = "${weekDay}" AND start_time BETWEEN ${startTime} AND ${endTime}`
          )

          return show[0]
        } catch (error) {
          throw new Error(error.sqlMessage || error.message)
        }
      }
}