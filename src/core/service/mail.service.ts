import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import Mail from "nodemailer/lib/mailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport(
  new SMTPTransport({
    service: "gmail",
    host: "smpt.gmail.com",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
);

export const sendMail = async (email: string, code: string) => {
  const mailOption: Mail.Options = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Yimirta uchun",
    text: `${email}, hisobni zo'rlab ro'yhatdan o'tqazish uchun kod: ${code}`,
  };

  try {
    const info = await transporter.sendMail(mailOption);
    console.log("Emailga jo'natildi" + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
