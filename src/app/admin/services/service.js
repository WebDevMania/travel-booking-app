import AXIOS_API from "@/utils/axiosAPI";

export async function getAllListings() {
    const { data } = await AXIOS_API.get('/admin/listing/get-all-listings')

    return data
}

export async function getAllReservations() {
    const { data } = await AXIOS_API.get('/admin/reservation/get-all-reservations')

    return data
}

export async function getAllRevenue() {
    const { data } = await AXIOS_API.get('/admin/reservation/get-all-revenue')

    return data
}

export async function getAllUsers() {
    const { data } = await AXIOS_API.get('/admin/user/get-all-users')

    return data
}

export async function deleteReview(id) {
    const { data } = await AXIOS_API.delete(`/admin/review/${id}`)

    return data
}