"use client";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useCart } from "../cart/CartContext";
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <form
        className="bg-white shadow-md rounded-lg p-8 max-w-md w-full space-y-6"
        onSubmit={handleSubmit}
        name="shippingForm"
        autoComplete="off"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
          Checkout
        </h2>
        <div>
          <input
            value={data.fullName}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-md border-2 text-gray-700 focus:outline-none focus:border-green-500 transition-colors ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            }`}
            type="text"
            name="fullName"
            placeholder="Full Name"
          />
          {errors.fullName && (
            <p className="mt-1 text-red-500 text-sm">{errors.fullName}</p>
          )}
        </div>
        <div>
          <input
            value={data.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-md border-2 text-gray-700 focus:outline-none focus:border-green-500 transition-colors ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            type="text"
            name="email"
            placeholder="Email Address (optional)"
          />
          {errors.email && (
            <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div>
          <input
            value={data.address}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-md border-2 text-gray-700 focus:outline-none focus:border-green-500 transition-colors ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
            type="text"
            name="address"
            placeholder="Shipping Address"
          />
          {errors.address && (
            <p className="mt-1 text-red-500 text-sm">{errors.address}</p>
          )}
        </div>
        <div>
          <input
            value={data.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-md border-2 text-gray-700 focus:outline-none focus:border-green-500 transition-colors ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            type="text"
            name="phone"
            placeholder="Phone Number"
          />
          {errors.phone && (
            <p className="mt-1 text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>
        <div>
          <button
            className="w-full bg-green-500 text-white py-3 px-4 rounded-md font-semibold uppercase tracking-wide transition duration-300 ease-in-out transform hover:bg-green-600 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>
        {loading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          </div>
        )}
      </form>
    </div>
  );
}
