import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { formData, cart } = req.body;

  // Ensure cart is defined and is an array
  if (!cart || !Array.isArray(cart)) {
    console.error("Invalid Cart Data:", cart);
    return res.status(400).json({ message: "Cart data is missing or invalid" });
  }

  try {
    // Configure the transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", 
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS,
      },
    });

    // Format the email content
    const productDetails = cart
      .map(
        (item: { name: string; quantity: number; price: number }) =>
          `Product: ${item.name}, Quantity: ${item.quantity}, Price: ${item.price}`
      )
      .join("\n");

    // Send email to the store admin
    const adminMailOptions = {
      from: `"Ghatal Electronics" <${process.env.EMAIL_USER}>`, // Sender address
      to: process.env.RECEIVER_EMAIL, // Receiver address
      subject: "New Order Received", 
      text: `
        Order Details:

        Name: ${formData.fullName}
        Email: ${formData.email || "N/A"}
        Address: ${formData.address}
        Phone: ${formData.phone}

        Products:
        ${productDetails}
      `,
    };

    await transporter.sendMail(adminMailOptions);

    // If user email exists, send a confirmation email to them
    if (formData.email) {
      const userMailOptions = {
        from: `"Ghatal Electronics" <${process.env.EMAIL_USER}>`, // Sender address
        to: formData.email, // User's email
        subject: "Order Confirmation", 
        text: `
          Dear ${formData.fullName},

          Thank you for your order! We have received the following details:

          Address: ${formData.address}
          Phone: ${formData.phone}

          Your ordered products:
          ${productDetails}

          If you are not related to this email, please ignore it.

          Thank you for shopping with us!
          - Ghatal Electronics
        `,
      };

      await transporter.sendMail(userMailOptions);
    }

    return res.status(200).json({ message: "Emails sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Error sending email" });
  }
}
