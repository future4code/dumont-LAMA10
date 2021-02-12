import { CustomError } from "../business/error/CustomError";
import { BaseDatabase } from "./BaseDatabase";
import { Band, BandDB } from "../business/entities/Band";

export class BandDatabase extends BaseDatabase {
    private static TABLE_NAME = "Bands_LAMA";

    private static toBandModel(band: any): Band {
        return new Band(
            band.id,
            band.name,
            band.music_genre,
            band.responsible
        )
    }

    public registerBand = async (band: BandDB): Promise<void> => {
        try {
            await BaseDatabase.connection
                .insert(band)
                .into(BandDatabase.TABLE_NAME)

        } catch (error) {
            throw new CustomError(error.statusCode, error.sqlMessage)
        }
    }

    public getBand = async (info: string): Promise<any> => {
        try {
            const result = await BaseDatabase.connection
                .select("*")
                .from(BandDatabase.TABLE_NAME)
                .where('id', info)
                .orWhere('name', info)

            return BandDatabase.toBandModel(result[0])

        } catch (error) {
            throw new CustomError(error.statusCode, error.sqlMessage)
        }
    }
}