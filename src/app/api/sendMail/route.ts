import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Handle POST requests
export async function POST(request: Request) {
  try {
    const { formData, cart } = await request.json();

    // Validate cart data
    if (!cart || !Array.isArray(cart)) {
      console.error("Invalid Cart Data:", cart);
      return NextResponse.json({ message: "Cart data is missing or invalid" }, { status: 400 });
    }

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

    // Send confirmation email to user if their email exists
    if (formData.email) {
      const userMailOptions = {
        from: `"Ghatal Electronics" <${process.env.EMAIL_USER}>`,
        to: formData.email,
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

    return NextResponse.json({ message: "Emails sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "Error sending email" }, { status: 500 });
  }
}
