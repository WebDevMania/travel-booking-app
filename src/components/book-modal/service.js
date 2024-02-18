import AXIOS_API from "@/utils/axiosAPI";
import { loadStripe } from "@stripe/stripe-js"

export const redirectToCheckout = async (
    listing,
    startDate,
    endDate,
    daysDifference
) => {
    try {
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

        if (!stripe) throw new Error("Stripe failed to initialize")

        const { data: { sessionId } } = await AXIOS_API.post('/stripe', {
            listing,
            startDate,
            endDate,
            daysDifference
        })

        const stripeError = await stripe.redirectToCheckout({
            sessionId
        })

        if(stripeError){
            return
        }

    } catch (error) {
        console.log(error)
    }
}