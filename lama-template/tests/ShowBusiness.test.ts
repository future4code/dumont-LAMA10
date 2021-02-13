import { ShowInputDTO } from "../src/business/entities/Show";
import { ShowBusiness } from "../src/business/ShowBusiness";

const token = jest.fn((input: any): any => {
    return { id: "id", role: "ADMIN" };
});

const validatorShowByDate = jest.fn(
    (weekDay: string, startTime: number, endTime: number): any => {
        return [{ show: "show" }];
    }
);

describe("Create show", () => {
    const authenticator = { getData: token } as any
    const idGenerator = { generate: jest.fn() } as any
    const showDataBase = {
        createBand: jest.fn(),
        getShowByDate: validatorShowByDate
    } as any

    
    test("Error when invalid date", async () => {
        const showBusiness: ShowBusiness = new ShowBusiness(
            idGenerator,
            authenticator,
            showDataBase
        )
    
        const input: ShowInputDTO = {
            bandId: "10",
            weekDay: "SATURDAY",
            startTime: 18,
            endTime: 16,
            token: "tokenTest"
        }

        try {
            await showBusiness.createShow(input)
        } catch (error) {
            expect(error.message).toBe("Selected time is invalid")
        }
    })

    test("Error when there's already a show", async () => {
        const showBusiness: ShowBusiness = new ShowBusiness(
            idGenerator,
            authenticator,
            showDataBase
        )
        
        const input: ShowInputDTO = {
            bandId: "10000",
            weekDay: "SATURDAY",
            startTime: 16,
            endTime: 18,
            token: "tokenTest"
        }

        try {
            await showBusiness.createShow(input)
        } catch (error) {
            expect(error.message).toBe("There's a show at this moment")
        }
    })
})