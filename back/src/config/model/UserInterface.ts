
export default interface UserInterface {
    id: string
    imageUrl?: string;
    name: string,
    email: string,
    password: string
    rol: 'Administrador' | 'Investigador'
    passwordResetCode?: string,
    passwordResetExpires?: Date
  
}