import { deleteUser } from "../functions/delete user/handler";

const data = {
    pathParameters: {
        "email": "irfan12"
    }
}
// const json_format_data =

test("Testing deleting function", async () => {
    expect(await deleteUser(data, null, null)).
        toEqual(
            {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'User deleted successfully'
                }),
            },
        )
})