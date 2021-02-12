import { LoginInputDTO, UserInputDTO, UserRole } from "../src/business/entities/User"
import { UserBusiness } from "../src/business/UserBusiness"

describe("Testando Sign Up", () => {
    const idGenerator = { generate: jest.fn() } as any
    const hashManager = { hash: jest.fn() } as any
    const authenticator = { generateToken: jest.fn() } as any
    const userDatabase = { createUser: jest.fn() } as any

    test("Error when 'name' is empty", async () => {
        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManager,
            authenticator,
            userDatabase
        )

        const input: UserInputDTO = {
            name: "",
            email: "test@email.com",
            password: "testando123",
            role: "normal"
        }

        try {
            await userBusiness.createUser(input)

        } catch (error) {
            expect(error.message).toBe("Missing properties")
            expect(error.statusCode).toBe(422)
        }
    })

    test("Error when 'email' is empty", async () => {
        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManager,
            authenticator,
            userDatabase
        )


        const input: UserInputDTO = {
            name: "test",
            email: "",
            password: "testando123",
            role: "normal"
        }

        try {
            await userBusiness.createUser(input)

        } catch (error) {
            expect(error.message).toBe("Missing properties")
            expect(error.statusCode).toBe(422)
        }
    })

    test("Error when 'password' is empty", async () => {
        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManager,
            authenticator,
            userDatabase
        )


        const input: UserInputDTO = {
            name: "test",
            email: "test@email.com",
            password: "",
            role: "normal"
        }

        try {
            await userBusiness.createUser(input)

        } catch (error) {
            expect(error.message).toBe("Missing properties")
            expect(error.statusCode).toBe(422)
        }
    })

    test("Error when 'role' is empty", async () => {
        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManager,
            authenticator,
            userDatabase
        )


        const input: UserInputDTO = {
            name: "test",
            email: "test@email.com",
            password: "testando123",
            role: ""
        }

        try {
            await userBusiness.createUser(input)

        } catch (error) {
            expect(error.message).toBe("Missing properties")
            expect(error.statusCode).toBe(422)
        }
    })

    test("Error when email is invalid", async () => {
        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManager,
            authenticator,
            userDatabase
        )


        const input: UserInputDTO = {
            name: "test",
            email: "testemail.com",
            password: "testando123",
            role: "normal"
        }

        try {
            await userBusiness.createUser(input)

        } catch (error) {
            expect(error.message).toBe("Invalid email")
            expect(error.statusCode).toBe(422)
        }
    })

    test("Error when password is invalid", async () => {
        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManager,
            authenticator,
            userDatabase
        )


        const input: UserInputDTO = {
            name: "test",
            email: "test@email.com",
            password: "test",
            role: "normal"
        }

        try {
            await userBusiness.createUser(input)

        } catch (error) {
            expect(error.message).toBe("Invalid password")
            expect(error.statusCode).toBe(422)
        }
    })

    test("Error when role is invalid", async () => {
        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManager,
            authenticator,
            userDatabase
        )


        const input: UserInputDTO = {
            name: "test",
            email: "test@email.com",
            password: "testando123",
            role: "test"
        }

        try {
            await userBusiness.createUser(input)

        } catch (error) {
            expect(error.message).toBe("Invalid role")
            expect(error.statusCode).toBe(422)
        }
    })

    test("Success case", async () => {
        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManager,
            authenticator,
            userDatabase
        )

        const input: UserInputDTO = {
            name: "test",
            email: "test@email.com",
            password: "testando123",
            role: "normal"
        }

        try {
            await userBusiness.createUser(input)

            expect(userDatabase.createUser).toHaveBeenCalled()
            expect(userDatabase.createUser).toHaveBeenCalledWith(input)
        } catch (error) {

        }
    })
})

export const getUserByEmailUndefinedMock = jest.fn((email: any): any => {
    return undefined
})

const getUserByEmailMock = jest.fn((email: any): any => {
    return {
        id: "id",
        name: "test",
        email: "test@email.com",
        password: "testando123",
        role: UserRole.NORMAL
    }
})

const compareTrue = jest.fn((password: any, hashPassowrd: any): any => {
    return true
})

const compareFalse = jest.fn((password: any, hashPassowrd: any): any => {
    return false
})


describe("Testando login", () => {
    const idGenerator = { generate: jest.fn() } as any
    const hashManagerTrue = { compare: compareTrue } as any
    const hahsManagerFalse = { compare: compareFalse } as any
    const authenticator = { generateToken: jest.fn() } as any
    const userDatabaseTrue = { getUserByEmail: getUserByEmailMock } as any
    const userDatabaseFalsy = { getUserByEmail: getUserByEmailUndefinedMock } as any

    test("Error when 'email' is empty", async () => {
        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManagerTrue,
            authenticator,
            userDatabaseTrue
        )


        const input: LoginInputDTO = {
            email: "",
            password: "testando123"
        }

        try {
            await userBusiness.getUserByEmail(input)

        } catch (error) {
            expect(error.message).toBe("Missing properties")
            expect(error.statusCode).toBe(422)
        }
    })

    test("Error when 'password' is empty", async () => {
        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManagerTrue,
            authenticator,
            userDatabaseTrue
        )

        const input: LoginInputDTO = {
            email: "test@email.com",
            password: ""
        }

        try {
            await userBusiness.getUserByEmail(input)

        } catch (error) {
            expect(error.message).toBe("Missing properties")
            expect(error.statusCode).toBe(422)
        }
    })

    test("Error when 'email' is invalid", async () => {
        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManagerTrue,
            authenticator,
            userDatabaseTrue
        )

        const input: LoginInputDTO = {
            email: "testemail.com",
            password: "testando123"
        }

        try {
            await userBusiness.getUserByEmail(input)

        } catch (error) {
            expect(error.message).toBe("Invalid email")
            expect(error.statusCode).toBe(422)
        }
    })

    test("Error when user not found", async () => {
        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManagerTrue,
            authenticator,
            userDatabaseFalsy
        )


        const input: LoginInputDTO = {
            email: "test@email.com",
            password: "testando123"
        }

        try {
            await userBusiness.getUserByEmail(input)

        } catch (error) {
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Invalid credentials!")
        }
    })

    test("Error when password is incorrect", async () => {
        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hahsManagerFalse,
            authenticator,
            userDatabaseTrue
        )

        const input: LoginInputDTO = {
            email: "test@email.com",
            password: "testando123"
        }

        try {
            await userBusiness.getUserByEmail(input)

        } catch (error) {
            expect(error.message).toBe("Invalid credentials!")
            expect(error.statusCode).toBe(401)
        }
    })

    test("Success case", async () => {
        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManagerTrue,
            authenticator,
            userDatabaseTrue
        )

        const input: LoginInputDTO = {
            email: "test@email.com",
            password: "testando123"
        }

        try {
            await userBusiness.getUserByEmail(input)

            expect(userDatabaseTrue.getUserByEmail).toHaveBeenCalled()
            expect(userDatabaseTrue.getUserByEmail).toHaveBeenCalledWith(input.email)
            expect(userBusiness.getUserByEmail).toHaveReturned()

        } catch (error) {

        }
    })
})