
export default interface StoragePasswordResetCodeRequest {
    userId: string,
    code: string,
    expires: number
}