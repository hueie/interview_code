import axios from "axios";
import { createItemFetchCall } from "../../ItemSagas/ItemSaga";

jest.mock("axios");
const mockedAxios: any = axios as jest.Mocked<typeof axios>;

test("test: createItemFetch ", () => {
    const res: any = {data: [{name: "Bob"}]};
    // axios.get.mockResolvedValue(resp);
    // or you could use the following depending on your use case:
    mockedAxios.get.mockImplementation(() => Promise.resolve(res));

    const result: any = createItemFetchCall(); // await

    expect(mockedAxios.get).toHaveBeenCalled();
    //    expect(result).toBe(expectedResult);
    // return createItemFetch().then(items: any => expect(items).toEqual(res.data));
});
