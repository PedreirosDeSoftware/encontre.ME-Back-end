import { env } from "@/env/schema";
import nodemailer from "nodemailer";
import "dotenv/config"

interface props {
    id: string,
    email: string
    name: string,
}

export async function sendMailClient({ id, email, name  }: props) {
    const account = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: { 
            user: account.user,
            pass: account.pass
        }
    });

    // const transporter = nodemailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 587,
    //     secure: false,
    //     auth: {
    //         user: env.EMAIL,
    //         pass: env.EMAIL_PASSWORD
    //     }
    // });

    const activationAccount = `http://localhost:3333/api/account/${id}/activation`

    const message = await transporter.sendMail({
        from: {
            name: 'Encontre.ME System',
            address: 'contato@encontre.me.com'
        },
        to: email,
        subject: 'Bem-vindo ao Encontre.ME!',
        html: `
                <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
                <p>Parabéns ${name}!!!</p>
                <p></p>
                <p>Você está ajudando a encontra pessoas que precisam da sua ajuda.🙂</p>
                <p></p>
                <p>Para ativar sua conta, por favor clique no link: <strong><a href="${activationAccount}">Ativar Conta</a></strong></p>
                <p></p>
                <p>Caso você não saiba do que se trata esse e-mail, apenas ignore esse e-mail.</p>
                <br/>
                <p>Atenciosamente,</p>
                <br/><br/>
                 <img width="500" style="border-radius: 10px" height="auto" alt="Home" title="Logo do Encontre.ME" src="cid:unique@nodemailer.com" />
                </div>`
            
            .trim(),
            attachments: [{
                filename: 'logo.jpg',
                path: './src/assets/logo.jpg',
                cid: 'unique@nodemailer.com' //same cid value as in the html img src
            }],
        });

    return message;
}




