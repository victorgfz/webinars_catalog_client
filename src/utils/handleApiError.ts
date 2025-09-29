import { AxiosError } from "axios"

export function message(error: unknown) {
    if (error instanceof AxiosError) {
        const message = error.response?.data?.message ?? "An unknown error occurred."
        return message
    }

    if (error instanceof Error) return error.message
    return "An unknown error occurred."
}

export const handleApiError = {
    message,
}