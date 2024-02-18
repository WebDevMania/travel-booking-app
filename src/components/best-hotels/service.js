import AXIOS_API from "@/utils/axiosAPI";

export async function getBestHotels() {
    const { data } = await AXIOS_API.get('/listing/best-hotels')

    if (data) {
        const blurredImages = await Promise.all(
            data.map((listing) => AXIOS_API.get(`/base64?url=${listing.imageUrls[0]}`))
        )

        const bestHotels = blurredImages.map((img, idx) => {
            const blurredImage = img.data
            const currentHotel = data[idx]

            return { ...currentHotel, blurredImage }
        })

        return bestHotels
    }
}