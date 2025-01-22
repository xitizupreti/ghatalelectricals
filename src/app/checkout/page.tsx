"use client";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useCart } from "../cart/CartContext";
import styles from "./Checkout.module.css";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, clearCartCheckout } = useCart();
  const router = useRouter();

  const [data, setData] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateEmail = (email: string) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };

  const validatePhone = (phone: string) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;
    const newErrors = {
      fullName: "",
      email: "",
      address: "",
      phone: "",
    };

    // Validation
    if (!data.fullName) {
      newErrors.fullName = "Full Name is required.";
      isValid = false;
      toast.error("Full Name is required.", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }

    if (data.email && !validateEmail(data.email)) {
      newErrors.email = "Invalid email format.";
      isValid = false;
      toast.error("Invalid email format.", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }

    if (!data.address) {
      newErrors.address = "Shipping Address is required.";
      isValid = false;
      toast.error("Shipping Address is required.", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }

    if (!data.phone) {
      newErrors.phone = "Phone Number is required.";
      isValid = false;
      toast.error("Phone Number is required.", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } else if (!validatePhone(data.phone)) {
      newErrors.phone = "Phone Number must be 10 digits.";
      isValid = false;
      toast.error("Invalid Phone Number.", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }

    setErrors(newErrors);

    if (isValid && cart.length > 0) {
      setLoading(true);
      try {
        const response = await fetch("/api/sendMail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            formData: data,
            cart,
          }),
        });

        if (response.ok) {
          toast.success("Order placed successfully!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
          clearCartCheckout(); // Clear the cart after successful order
          setData({
            fullName: "",
            email: "",
            address: "",
            phone: "",
          });
          // Redirect to a thank you page or home page
          setTimeout(() => {
            router.push("/thank-you");
          }, 2000);
        } else {
          const error = await response.json();
          toast.error(error.message || "Failed to place order", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Failed to submit order. Please try again later.", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } finally {
        setLoading(false);
      }
    } else if (cart.length === 0) {
      toast.error("Your cart is empty!", { theme: "colored" });
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      name="shippingForm"
      autoComplete="off"
    >
      <input
        value={data.fullName}
        onChange={handleChange}
        className={styles.input}
        style={errors.fullName ? { border: "1px solid red" } : {}}
        type="text"
        name="fullName"
        placeholder="Full Name"
      />
      <span style={{ color: "red" }}>{errors.fullName}</span>
      <br />
      <input
        value={data.email}
        onChange={handleChange}
        className={styles.input}
        style={errors.email ? { border: "1px solid red" } : {}}
        type="text"
        name="email"
        placeholder="Email Address (optional)"
      />
      <span style={{ color: "red" }}>{errors.email}</span>
      <br />
      <input
        value={data.address}
        onChange={handleChange}
        className={styles.input}
        style={errors.address ? { border: "1px solid red" } : {}}
        type="text"
        name="address"
        placeholder="Shipping Address"
      />
      <span style={{ color: "red" }}>{errors.address}</span>
      <br />
      <input
        value={data.phone}
        onChange={handleChange}
        className={styles.input}
        style={errors.phone ? { border: "1px solid red" } : {}}
        type="text"
        name="phone"
        placeholder="Phone Number"
      />
      <span style={{ color: "red" }}>{errors.phone}</span>
      <br />
      <button
        className={`${styles.submit} ${styles.input}`}
        type="submit"
        disabled={loading}
      >
        {loading ? "Sending..." : "Submit"}
      </button>
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      )}
    </form>
  );
}
