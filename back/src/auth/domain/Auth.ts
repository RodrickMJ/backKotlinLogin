// auth/domain/Auth.ts
export default interface Auth {
    id: string,
    imageUrl?: string,
    name: string,
    email: string,
    password: string
    rol: 'Administrador' | 'Investigador'
    passwordResetCode?: string,
    passwordResetExpires?: Date
  
}