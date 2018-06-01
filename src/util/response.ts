export function formatRes(code: number, data?: any, message?: string, status: number = 200):object {
    return {
        code,
        data,
        status,
        message
    }
}