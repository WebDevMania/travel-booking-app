import AXIOS_API from "@/utils/axiosAPI";

export async function getPopularPlaces() {
    const { data } = await AXIOS_API.get('/listing/popular-locations')

    return data
}