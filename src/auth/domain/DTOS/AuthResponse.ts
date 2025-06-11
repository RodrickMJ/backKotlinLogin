export default interface AuthResponse {
  id: string
  name: string;
  email: string;
  token?: string;
  rol: 'Administrador' | 'Investigador'
}
