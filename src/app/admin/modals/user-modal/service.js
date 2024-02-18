import AXIOS_API from "@/utils/axiosAPI";

export async function getUserById(userId) {
    const { data } = await AXIOS_API.get(`/admin/user/${userId}`)

    return data
}

export async function updateUser({ userId, data }) {
    const { data: updatedUser } = await AXIOS_API.put(`/admin/user/${userId}`, data)

    return updatedUser
}