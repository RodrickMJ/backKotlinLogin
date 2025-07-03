// auth/domain/DTOS/AuthResponse.ts
export default interface AuthResponse {
  id: string;
  imageUrl?: string;
  name: string;
  email: string;
  token?: string;
  rol: 'Administrador' | 'Investigador'
}
