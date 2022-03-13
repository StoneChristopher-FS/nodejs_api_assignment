const { todoService, todoServiceById } = require("./todoService")

jest.mock("./todoService.js")


describe("Todo Service Tests", () => {
    test("should return 200 todos", async () => {
        const result = await todoService()

        expect(result).toHaveLength(10)
        expect(result[8].userId).toEqual(1)
        expect(result[8].id).toEqual(9)
        expect(result[8].title).toEqual("molestiae perspiciatis ipsa")
        expect(result[8].completed).toEqual(false)
    })

    test("should return a Todo Object By ID", async () => {
        const result = await todoServiceById(3)

        expect(result.userId).toEqual(1)
        expect(result.title).toEqual("fugiat veniam minus")
        expect(result.id).toEqual(3)
        
    })
})