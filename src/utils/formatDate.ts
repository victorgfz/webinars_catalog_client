export function formatDate(date: Date): string {
    const newDate = new Date(date)
    const month = newDate.toLocaleString("en-US", { month: "long" })
    const day = newDate.getDate()
    return `${month}, ${day}`
}