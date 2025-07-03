// auth/domain/DTOS/AuthRequest.ts
export default interface AuthRequest {
    name?: string,
    password: string,
    email: string,
}