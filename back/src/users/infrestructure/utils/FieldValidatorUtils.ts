import FieldValidatorInterface from "../../aplication/utils/FieldValidatorInterface";
import UserRequest from "../../domain/DTOS/UserRequest";

export default class FieldValidatorUtils implements FieldValidatorInterface {
    
    private readonly roles = ['Administrador', 'Investigador'];

    addValidator(request: UserRequest): { isValid: boolean; message: string } {

        if (!request) return { isValid: false, message: 'All fields are required' };

        if (!this.roles.includes(request.rol)) {
            return {
                isValid: false,
                message: 'Role does not exist'
            };
        }

        if (!this.isValidEmail(request.email)) {
            return {
                isValid: false,
                message: 'The email format is invalid',
            };
        }

        return { isValid: true, message: 'Validation is successful' };
    }

    

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

}

