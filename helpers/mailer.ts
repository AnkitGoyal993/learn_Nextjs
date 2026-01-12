/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordExpire: Date.now() + 3600000,
      });
    } 
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 587,
      secure:false,
      auth: {
        user: "ab664744b59128",
        pass: "9a9076e1c95445",
      },
    });

    await transport.verify();
    console.log("SMTP connected");

    const mailResponse = await transport.sendMail({
      from: "no-reply@yourapp.com",
      to: email,
      subject:
        emailType === "VERIFY"
          ? "Verify your email"
          : "Reset your password",
      html: `<p>
          Click <a href="${process.env.DOMAIN}/${
            emailType === "VERIFY" ? "verifyemail" : "reset-password"
          }?token=${hashedToken}">
          here</a> to ${
            emailType === "VERIFY"
              ? "verify your email"
              : "reset your password"
          }.
        </p>`,
    });

    console.log("Mail sent:", mailResponse.messageId);
    return mailResponse;
  } catch (error: any) {
    console.error("Mail error:", error);
    throw new Error(error.message);
  }
};
