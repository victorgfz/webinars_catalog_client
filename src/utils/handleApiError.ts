import { AxiosError } from "axios"

export function message(error: unknown) {
    if (error instanceof AxiosError) {
        const message = error.response?.data?.message ?? "An unknown error occurred."
        return message
    }

    if (error instanceof Error) return error.message
    return "An unknown error occurred."
}

export function action(error: unknown) {
    if (error instanceof AxiosError) {
        const status = error.response?.status
        if (status === 401 || status === 403) return "redirect"

    }
    return "back"
}

export const handleApiError = {
    message,
    action,
}