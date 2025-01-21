import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { formData, cart } = await request.json();

    // Validate cart data
    if (!cart || !Array.isArray(cart)) {
      console.error("Invalid Cart Data:", cart);
      return NextResponse.json(
        { message: "Cart data is missing or invalid" },
        { status: 400 }
      );
    }

    // Calculate total price from the cart
    const calculateTotal = (cart: { price: number; quantity: number }[]) => {
      return cart.reduce(
        (total, item) => total + (item.price || 0) * item.quantity,
        0
      );
    };
    const totalPrice = calculateTotal(cart);

    // Configure the transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Format the email content with HTML
    console.log()
    const productDetailsHTML = cart
      .map(
        (item: {
          name: string;
          quantity: number;
          price: number;
          image: string; 
        }) => {
          console.log(item.image)
          return `
          <div>
            <p>Product: ${item.name}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: ${item.price}</p>
            <img src="https://ghatalelectricals.vercel.app/${item.image}" alt="${item.name}" style="max-width: 100px;"> 
          </div>
        `}
      )
      .join("");

    // Send email to the store admin
    const adminMailOptions = {
      from: `"Ghatal Electronics" <${process.env.EMAIL_USER}>`, // Sender address
      to: process.env.RECEIVER_EMAIL, // Receiver address
      subject: "New Order Received",
      html: `
        <h3>Order Details:</h3>
        <p><strong>Name:</strong> ${formData.fullName}</p>
        <p><strong>Email:</strong> ${formData.email || "N/A"}</p>
        <p><strong>Address:</strong> ${formData.address}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <h4>Products:</h4>
        ${productDetailsHTML}
        <p><strong>Total Price:</strong> Rs. ${totalPrice.toFixed(2)}</p>
      `,
    };

    await transporter.sendMail(adminMailOptions);

    // Send confirmation email to user if their email exists
    if (formData.email) {
      const userMailOptions = {
        from: `"Ghatal Electronics" <${process.env.EMAIL_USER}>`,
        to: formData.email,
        subject: "Order Confirmation",
        html: `
          <p>Dear ${formData.fullName},</p>
          <p>Thank you for your order! We have received the following details:</p>
          <p><strong>Address:</strong> ${formData.address}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <h4>Your ordered products:</h4>
          ${productDetailsHTML}
          <p><strong>Total Price:</strong> Rs. ${totalPrice.toFixed(2)}</p>
          <p>Your order will be processed shortly.</p>
          <p>If you are not related to this email, please ignore it.</p>
          <p>Thank you for shopping with us!</p>
          <p>- Ghatal Electronics</p>
        `,
      };

      await transporter.sendMail(userMailOptions);
    }

    return NextResponse.json(
      { message: "Emails sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Error sending email" },
      { status: 500 }
    );
  }
}