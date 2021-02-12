import { CustomError } from "../business/error/CustomError";
import { BaseDatabase } from "./BaseDatabase";
import { Band } from "../business/entities/Band";

export class BandDatabase extends BaseDatabase {
    private static TABLE_NAME = "Bands_LAMA";

    private static toBandModel(band: any): Band {
        return new Band(
            band.id,
            band.name,
            band.genre,
            band.responsible
        );
    }

    public registerBand = async (id: string,
        name: string,
        music_genre: string,
        responsible: string): Promise<void> => {
        try {
            await BaseDatabase.connection
                .insert({
                    id,
                    name,
                    music_genre,
                    responsible
                })
                .into(BandDatabase.TABLE_NAME)

        } catch (error) {
            throw new CustomError(error.statusCode, error.sqlMessage)
        }
    }

    public getBand = async (
        id: string,
        name: string
    ): Promise<any> => {
        try {
            const result = await BaseDatabase.connection
                .select("*")
                .from(BandDatabase.TABLE_NAME)
                .where({ id })
                .orWhere({ name })

            return BandDatabase.toBandModel(result[0])

        } catch (error) {
            throw new CustomError(error.statusCode, error.sqlmessage)
        }
    }
}