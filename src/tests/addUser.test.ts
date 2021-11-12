import { addUser } from "../functions/add user/handler";

const data = {
    "body": {
        "userName": "nk",
        "email": "naveed",
        "password": "asd"
    }
}
// const json_format_data =

test("Adding data and checking the response", async () => {
    expect(await addUser(data, null, null)).
        toEqual(
            {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'User successfully added'
                }),
            },
        )
})


