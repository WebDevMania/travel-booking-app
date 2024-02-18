export const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)

    const dateInMilliseconds = new Date(start.getTime())

    const dates = []

    while(dateInMilliseconds <= end){
        dates.push(new Date(dateInMilliseconds).getTime())
        dateInMilliseconds.setDate(dateInMilliseconds.getDate() + 1)
    }

    return dates
}