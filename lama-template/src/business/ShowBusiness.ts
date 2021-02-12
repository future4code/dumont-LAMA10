import { ShowDatabase } from "../data/ShowDatabase";
import { ShowDB, ShowInputDTO, Show } from "./entities/Show";
import { AuthenticationData } from "./entities/User";
import { CustomError } from "./error/CustomError";
import { Authenticator } from "./services/Authenticator";
import { IdGenerator } from "./services/IdGenerator";

export class ShowBusiness {
    constructor(
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private showDataBase: ShowDatabase
    ) { }

    public async createShow(
        input: ShowInputDTO
    ) {
        try {
            const id = this.idGenerator.generate();
            const tokenData: AuthenticationData = this.authenticator.getData(input.token);

            if (!input.bandId || !input.weekDay || !input.startTime || !input.endTime) {
                throw new CustomError(422, "Missing properties")
            }
            if (tokenData.role !== "ADMIN") {
                throw new CustomError(401, "Not authorized")
            }

            if (
                input.startTime > input.endTime ||
                input.startTime < 8 ||
                input.endTime > 23 ||
                !Number.isInteger(input.startTime) ||
                !Number.isInteger(input.endTime)
            ) {
                throw new CustomError(400, "Selected time is invalid")
            }

            const showSchedule = await this.showDataBase.getShowByDate(
                input.weekDay,
                input.startTime,
                input.endTime
            )

            if (showSchedule.length > 0) {
                throw new Error("There's a show at this moment");
            }

            const newShow: ShowDB = {
                id: id,
                week_day: Show.stringToWeekDay(input.weekDay),
                start_time: input.startTime,
                end_time: input.endTime,
                band_id: input.bandId
            }

            await this.showDataBase.createShow(newShow);
        } catch (error) {
            throw new CustomError(error.statusCode, error.message);
        }
    }

    public async getShowByDay(day: string): Promise<any> {
        try {
            if (!day) {
                throw new CustomError(422, "Invalid day")
            }
            const queryData = await this.showDataBase.getShowByDay(
                Show.stringToWeekDay(day)
            )

            const showSchedule = queryData.map((item: ShowDB) => {
                return {
                    id: item.id,
                    weekDay: item.week_day,
                    startTime: item.start_time,
                    endTime: item.end_time,
                    bandId: item.band_id
                }
            })

            return showSchedule
        } catch (error) {
            throw new CustomError(error.statusCode, error.message);
        }
    }

}
