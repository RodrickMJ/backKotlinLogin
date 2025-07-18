import UserRequest from "../../domain/DTOS/UserRequest"

export default interface FieldValidatorInterface {
    addValidator(request: UserRequest): {isValid: boolean, message: string}    
}