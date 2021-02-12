import { BandDatabase } from "../data/BandDatabase";
import { AuthenticationData, User, UserRole } from "./entities/User";
import { CustomError } from "./error/CustomError";
import { Authenticator } from "./services/Authenticator";
import { IdGenerator } from "./services/IdGenerator";
import { BandInputDTO } from "./entities/Band";

export class BandBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private bandDatabase: BandDatabase
    ) { }

    public registerBand = async (
        input: BandInputDTO,
    ): Promise<void> => {
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

        await this.bandDatabase.registerBand(
            id, input.name, input.genre, input.responsible)

    }
}
