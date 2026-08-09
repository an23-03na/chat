import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

interface Props {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({ to, subject, html }: Props) => {
  try {
    const info = await transporter.sendMail({
      from: `"Example Team" <${process.env.GMAIL_USER}>`, // sender address
      to, // list of recipients
      subject, // subject line
      html, // HTML body
    });

    return info;
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
};
