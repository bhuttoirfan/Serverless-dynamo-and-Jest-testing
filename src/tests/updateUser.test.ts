import { updateUser } from "@functions/update user/handler";

const data = {
    body: {
        "email": "irfan12",
        "password": "pas123"
    }
}
// const json_format_data =

test("Testing update function", async () => {
    expect(await updateUser(data, null, null)).
        toEqual(
            {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'User successfully updated'
                }),
            },
        )
})