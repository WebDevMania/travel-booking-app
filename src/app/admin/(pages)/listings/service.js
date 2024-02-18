import AXIOS_API from "@/utils/axiosAPI";

export async function updateListing({ listingId, body }) {
    const { data: updatedListing } = await AXIOS_API.put(`/admin/listing/${listingId}`, body)

    return updatedListing
}

export async function deleteListing(id) {
    const { data } = await AXIOS_API.delete(`/admin/listing/${id}`)

    return data
}

