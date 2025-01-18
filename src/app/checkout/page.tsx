"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./Checkout.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ShippingForm() {
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateEmail = (email: string) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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

    // Full Name Validation
    if (!data.fullName) {
      newErrors.fullName = "Full Name is required.";
      isValid = false;
      toast.error("Full Name is required.", { theme: "colored" });
    }

    // Email Validation (optional)
    if (data.email && !validateEmail(data.email)) {
      newErrors.email = "Invalid email format.";
      isValid = false;
      toast.error("Invalid email format.", { theme: "colored" });
    }

    // Shipping Address Validation
    if (!data.address) {
      newErrors.address = "Shipping Address is required.";
      isValid = false;
      toast.error("Shipping Address is required.", { theme: "colored" });
    }

    // Phone Number Validation
    if (!data.phone) {
      newErrors.phone = "Phone Number is required.";
      isValid = false;
      toast.error("Phone Number is required.", { theme: "colored" });
    } else if (!validatePhone(data.phone)) {
      newErrors.phone = "Phone Number must be 10 digits.";
      isValid = false;
      toast.error("Invalid Phone Number.", { theme: "colored" });
    }

    setErrors(newErrors);

    if (isValid) {
      console.log("Form submitted:", data);
      toast.success("Form submitted successfully!", { theme: "colored" });

      // Reset form
      setData({
        fullName: "",
        email: "",
        address: "",
        phone: "",
      });
    }
  };

  const errorStyles = {
    border: "1px solid rgba(234, 56, 31,1)",
    backgroundImage: "url(/images/icon-error.svg)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "95% 50%",
  };

  const normalStyles = {
    border: "3px solid hsl(246, 25%, 77%)",
    backgroundImage: "none",
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
        style={errors.fullName ? errorStyles : normalStyles}
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
        style={errors.email ? errorStyles : normalStyles}
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
        style={errors.address ? errorStyles : normalStyles}
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
        style={errors.phone ? errorStyles : normalStyles}
        type="text"
        name="phone"
        placeholder="Phone Number"
      />
      <span style={{ color: "red" }}>{errors.phone}</span>
      <br />
      <button className={`${styles.submit} ${styles.input}`} type="submit">
        Submit
      </button>
      <ToastContainer />
    </form>
  );
}
