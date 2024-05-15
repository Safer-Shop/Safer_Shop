import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import Mail from "nodemailer/lib/mailer";

const transporter = nodemailer.createTransport(
  new SMTPTransport({
    service: "gmail",
    host: "smpt.gmail.com",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  })
);

export const sendMail = async (email: string, code: string) => {
  const mailOption: Mail.Options = {
    from: process.env.EMAIL,
    to: email,
    subject: "Yimirta uchun",
    text: `${email}, acountni zo'rlab ro'yhatdan o'tirish uchun code: ${code}`,
  };

  const info = await transporter.sendMail(mailOption);
  console.log("Emailga jo'natildi" + info.response);
};
