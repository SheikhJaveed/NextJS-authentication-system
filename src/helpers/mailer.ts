// domain.com/verifyToken/:token -> server side rendering
// domain.com/verifyToken?token=token -> client side rendering (we are using this)

import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({email,emailType,userId}:any)=>{
    try {
        //create a hash based token
        const hashedToken = await bcrypt.hash(userId.toString(),10);
        
        if(emailType==="VERIFY"){
            await User.findByIdAndUpdate(userId,{verifyToken:hashedToken,
                verifyTokenExpiry:Date.now() + 3600000
            });
        }
        else if(emailType==="RESET"){
            await User.findByIdAndUpdate(userId,
            {   forgotPasswordToken:hashedToken,
                forgotPasswordExpiry:Date.now() + 3600000
            });
        }

        //create a transporter
        let transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
            }
        });

        const mailOptions = {
            from: 'me@gmail.com',
            to: email,
            subject: emailType === "VERIFY"
                ? "Verify your email"
                : emailType === "RESET"
                    ? "Reset your password"
                    : "Forgot your password",
            html: `
                <p>
                    Click 
                    <a href="http://localhost:3000/${
                        emailType === "VERIFY"
                            ? "verifyemail"
                            : emailType === "RESET"
                                ? "resetpassword"
                                : "forgotpassword"
                    }?token=${hashedToken}">here</a> 
                    to ${
                        emailType === "VERIFY"
                            ? "verify your email"
                            : emailType === "RESET"
                                ? "reset your password"
                                : "recover your account"
                    }
                    or copy and paste the link below in your browser. <br> 
                    
                    http://localhost:3000/${
                        emailType === "VERIFY"
                            ? "verifyemail"
                            : emailType === "RESET"
                                ? "resetpassword"
                                : "forgotpassword"
                    }?token=${hashedToken}
                </p>
            `,
        };
        

        const mailResponse = await transport.sendMail(mailOptions);
        console.log("Email sent:",mailResponse.messageId);
        return mailResponse;
    } catch (error:any) {
        throw new Error(error.message);
    }
}