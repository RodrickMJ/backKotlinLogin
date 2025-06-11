import EmailRequest from "../../domain/DTOS/EmailRequest";

export default interface EmailInterface {
    sendEmail(request: EmailRequest): Promise<void>;
}
