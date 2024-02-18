import AXIOS_API from "@/utils/axiosAPI";

export async function getUserReservations() {
    const { data } = await AXIOS_API.get(`/reservation`)

    return data
}

export async function deleteReservation({ chargeId, reservationId }) {
    const { data: _, error: refundError } = await refundPayment({ chargeId, reservationId })
    if (refundError) throw new Error("Couldn't refund your reservation")

    const { data, error } = await AXIOS_API.delete(`/reservation/${reservationId}`)

    return { data, error }
}

async function refundPayment({ chargeId, reservationId }) {
    const { data, error } = await AXIOS_API.delete(`/stripe?charge_id=${chargeId}&reservation_id=${reservationId}`)

    return { data, error }
}