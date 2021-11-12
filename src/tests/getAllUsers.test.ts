import { getAllUser } from "../functions/get all users/handler";

test("Getting data of all users inserted into db",async () => {
    
    const response = await getAllUser(null, null, null)
    
    const statusCode = response.statusCode; 
    const length = response.body.length;

    expect(statusCode).toBe(200);
    expect(length).toBeGreaterThan(0);
    
})