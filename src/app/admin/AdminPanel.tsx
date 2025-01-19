"use client";
import { useState } from "react";
import Image from "next/image";

export default function AdminPanel() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    quantity: 1,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const handleLogout = () => {
    const date = new Date();
    date.setDate(date.getDate() + 3); // Set expiration to 3 days from now
    document.cookie = `authToken=; path=/; expires=${date.toUTCString()};`;
    window.location.href = "/login";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          quantity: parseInt(formData.quantity.toString(), 10),
        }),
      });

      if (response.ok) {
        const newProduct = await response.json();
        console.log("Product added:", newProduct);
        setSuccess("Product added successfully!");
        setFormData({ name: "", price: "", image: "", quantity: 1 });
        setImagePreview(null);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        setError(errorData.error || "Failed to add product.");
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Failed to connect to the server.");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setError("");
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setFormData((prev) => ({ ...prev, image: data.filename }));
          setImagePreview(URL.createObjectURL(file));
        } else {
          const errorData = await response.json();
          console.error("Upload error:", errorData);
          setError(
            "Failed to upload image: " + (errorData.error || "Unknown error")
          );
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        setError("Failed to upload image: Network error");
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="border p-4 mt-8">
      <h3 className="text-lg font-bold mb-4">Add New Product</h3>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            step="0.01"
          />
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {isUploading && <p className="text-yellow-500 mt-2">Uploading...</p>}
          {imagePreview && (
            <div className="mt-2">
              <Image
                src={imagePreview || "/placeholder.svg"}
                alt="Preview"
                width={100}
                height={100}
                className="object-cover"
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
                quantity: parseInt(e.target.value, 10),
              })
            }
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            min="1"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Add Product"}
        </button>
      </form>
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mt-4"
      >
        Logout
      </button>
    </div>
  );
}
