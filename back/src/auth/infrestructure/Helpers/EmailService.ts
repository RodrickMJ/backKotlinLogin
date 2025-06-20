import 'dotenv/config'
import EmailInterface from "../../aplication/service/Emailnterface";
import EmailRequest from "../../domain/DTOS/EmailRequest";
import Mailertransporter from '../../../config/Mailer';


const userGmail = process.env['EMAIL_SERVER'] || ''; 

export default class EmailService implements EmailInterface {
    
   async sendEmail(request: EmailRequest): Promise<void> {
    await Mailertransporter.sendMail({
        from: `"Support Reset Password"<${userGmail}>`,
        to: request.to,
        subject: request.subject,
        text: request.text
    });

    console.log("Se ah enviado correctamente el correo");    

    }

}
