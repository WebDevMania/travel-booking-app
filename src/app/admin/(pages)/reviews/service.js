import AXIOS_API from "@/utils/axiosAPI";

export async function getAllReviews() {
    const { data } = await AXIOS_API.get('/admin/review')

    return data
}