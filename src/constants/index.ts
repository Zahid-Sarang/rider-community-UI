import { selfApi } from "../http/api";
export const getSelf = async () => {
    const { data } = await selfApi();
    return data;
};

