
export default interface IUser {
    id: string
    name: string,
    email: string,
    password: string
    rol: 'Administrador' | 'Investigador'
    passwordResetCode?: string,
    passwordResetExpires?: Date
  
}