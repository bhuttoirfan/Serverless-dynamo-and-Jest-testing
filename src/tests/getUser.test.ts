import { getUser } from "../functions/get user/handler";

const data = {
    pathParameters: {
        "email": "irfan123",
    }
}
// const json_format_data =

test("Getting single user and its info",async () => {
    expect(await getUser(data, null, null)).toEqual(
        {
            statusCode: 200,
            body: JSON.stringify({
                user: {
                    Item: {
                        userName: "IAM",
                        email: "irfan123",
                        password: "asd"
                    }
                }
            })
        }
    )
})


