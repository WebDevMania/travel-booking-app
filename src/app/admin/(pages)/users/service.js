import AXIOS_API from "@/utils/axiosAPI";

export async function deleteUser(id) {
    const { data } = await AXIOS_API.delete(`/admin/user/${id}`)

    return data
}