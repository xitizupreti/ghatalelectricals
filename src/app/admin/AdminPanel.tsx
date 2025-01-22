"use client";
import { useState } from "react";
import Image from "next/image";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

// Define categories
const categories = [
  "Lights & Accessories",
  "Power Tools",
  "Hand Tools",
  "Gardening Tools",
  "Bathroom Hardware",
  "General Hardware",
  "Machinery",
  "Automotive Accessories",
];

export default function AdminPanel() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: null as File | null,
    quantity: 1,
    category: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    setLoading(true);
    const date = new Date();
    date.setDate(date.getDate() + 3); // Set expiration to 3 days from now
    document.cookie = `authToken=; path=/; expires=${date.toUTCString()};`;
    window.location.href = "/login";
    toast.warning("Logged Out", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.image) {
      setError("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const imageFormData = new FormData();
      imageFormData.append("image", formData.image);

      // Upload image
      const imageUploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: imageFormData,
      });

      if (!imageUploadResponse.ok) {
        throw new Error("Failed to upload image");
      }

      const { imageUrl } = await imageUploadResponse.json();

      // Create product
      const productResponse = await fetch(`/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          price: Number.parseFloat(formData.price),
          image: imageUrl,
          quantity: Number.parseInt(formData.quantity.toString(), 10),
          category: formData.category,
        }),
      });

      if (productResponse.ok) {
        await productResponse.json();
        setSuccess("Product added successfully!");
        toast.success("Product added successfully!", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        setFormData({
          name: "",
          price: "",
          image: null,
          quantity: 1,
          category: "",
        });
        setImagePreview(null);
        router.refresh();
      } else {
        const errorData = await productResponse.json();
        setError(errorData.error || "Failed to add product.");
        toast.warning("Failed to add product.", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch {
      setError("Failed to connect to the server.");
      toast.error("Failed to connect to the server.", {
        position: "top-center",
        autoClose: 5000,
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
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h3 className="text-2xl font-bold text-center">Add New Product</h3>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            step="0.01"
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {imagePreview && (
            <div className="mt-4 flex justify-center">
              <Image
                src={imagePreview || "/placeholder.svg"}
                alt="Preview"
                width={200}
                height={200}
                className="object-cover rounded-md shadow-sm"
              />
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700"
          >
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({
                ...formData,
                quantity: Number.parseInt(e.target.value, 10),
              })
            }
            className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            min="1"
          />
        </div>
        {loading && (
          <p className="text-yellow-500 mt-2 text-center">Uploading...</p>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>

        <button
          disabled={loading}
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Log Out
        </button>
      </form>
    </div>
  );
}
