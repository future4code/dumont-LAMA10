import { BandDatabase } from "../data/BandDatabase";
import { AuthenticationData, User, UserRole } from "./entities/User";
import { CustomError } from "./error/CustomError";
import { Authenticator } from "./services/Authenticator";
import { IdGenerator } from "./services/IdGenerator";
import { Band, BandDB, BandInputDTO } from "./entities/Band";

export class BandBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private bandDatabase: BandDatabase
    ) { }

    public registerBand = async (
        input: BandInputDTO,
    ): Promise<void> => {
        try {
            if (!input.name || !input.genre || !input.responsible) {
                throw new CustomError(422, "Missing properties")
            }

            if (!input.token) {
                throw new CustomError(422, "Missing properties")
            }

            const tokenData: AuthenticationData = this.authenticator.getData(input.token)

            const role: UserRole = User.stringToUserRole(tokenData.role!)

            if (role === UserRole.NORMAL) {
                throw new CustomError(401, "Not authorized")
            }

            const id: string = this.idGenerator.generate()

            const newBand: BandDB = {
                id: id,
                name: input.name,
                music_genre: input.genre,
                responsible: input.responsible
            }
            await this.bandDatabase.registerBand(newBand)
        } catch (error) {
            throw new CustomError(error.statusCode, error.message);
        }

    }

    public getBand = async (info: string): Promise<Band> => {

        try {
            const result = await this.bandDatabase.getBand(info)

            if (!result) {
                throw new CustomError(404, "Not Found");
            }

            return result
        } catch (error) {
            throw new CustomError(error.statusCode, error.message);
        }

    }
}

