import { BandBusiness } from "../src/business/BandBusiness"
import { BandInputDTO } from "../src/business/entities/Band"

const dataTokenRoleNormalMock = jest.fn((token: any): any =>{
    return {
        id:"id",
        role: "NORMAL"
    }
})

const dataTokenRoleAdminMock = jest.fn((token: any): any =>{
    return {
        id:"id",
        role: "ADMIN"
    }
})

describe("Testando register band", () =>{
    const roleAdmin = { getData: dataTokenRoleAdminMock } as any
    const roleNormal = { getData: dataTokenRoleNormalMock } as any
    const idGenerator = { generate: jest.fn() } as any
    const bandDatabase = { registerBand: jest.fn() } as any


    test("Error when 'name' is empty", async () =>{
        const bandBusiness: BandBusiness = new BandBusiness(
            idGenerator,
            roleAdmin,
            bandDatabase
        )

        const input: BandInputDTO = {
            name: "",
            genre: "Rock",
            responsible: "John Lennon",
            token: "tokenTest"
        }
    
        try {
            await bandBusiness.registerBand(input)

        } catch (error) {
            expect(error.message).toBe("Missing properties")  
            expect(error.statusCode).toBe(422)
        }
    })

    test("Error when 'genre' is empty", async () =>{
        const bandBusiness: BandBusiness = new BandBusiness(
            idGenerator,
            roleAdmin,
            bandDatabase
        )

        const input: BandInputDTO = {
            name: "Beatles",
            genre: "",
            responsible: "John Lennon",
            token: "tokenTest"
        }
        

        try {
            await bandBusiness.registerBand(input)

        } catch (error) {
            expect(error.message).toBe("Missing properties")  
            expect(error.statusCode).toBe(422)
        }
    })

    test("Error when 'responsible' is empty", async () =>{
        const bandBusiness: BandBusiness = new BandBusiness(
            idGenerator,
            roleAdmin,
            bandDatabase
        )

        const input: BandInputDTO = {
            name: "Beatles",
            genre: "Rock",
            responsible: "",
            token: "tokenTest"
        }
        

        try {
            await bandBusiness.registerBand(input)

        } catch (error) {
            expect(error.message).toBe("Missing properties")  
            expect(error.statusCode).toBe(422)
        }
    })

    test("Error when role is 'NORMAL'", async () =>{
        const bandBusiness: BandBusiness = new BandBusiness(
            idGenerator,
            roleNormal,
            bandDatabase
        )

        const input: BandInputDTO = {
            name: "Beatles",
            genre: "Rock",
            responsible: "John Lennon",
            token: "tokenNormal"
        }
        
        try {
            await bandBusiness.registerBand(input)

        } catch (error) {
            expect(error.message).toBe("Not authorized")  
            expect(error.statusCode).toBe(401)
        }
    })

    test("Success case", async () =>{
        const bandBusiness: BandBusiness = new BandBusiness(
            idGenerator,
            roleAdmin,
            bandDatabase
        )

        const input: BandInputDTO = {
            name: "Beatles",
            genre: "Rock",
            responsible: "John Lennon",
            token: "tokenTest"
        }
        

        try {
            await bandBusiness.registerBand(input)

            expect(bandDatabase.registerBand).toHaveBeenCalled()
            expect(bandDatabase.registerBand).toHaveBeenCalledWith(input)

        } catch (error) {

        }
    })
})