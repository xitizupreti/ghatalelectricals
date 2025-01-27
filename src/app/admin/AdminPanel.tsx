"use client";
import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

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

const initialFormData = {
  name: "",
  price: "",
  image: null as File | null,
  quantity: 1,
  category: "",
};

export default function AdminPanel() {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingOut, setLoadingOut] = useState(false);
  const router = useRouter();

  const handleLogout = useCallback(() => {
    setLoadingOut(true);
    const date = new Date();
    date.setDate(date.getDate() + 3);
    document.cookie = `authToken=; path=/; expires=${date.toUTCString()};`;
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
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
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setSuccess("");

      if (!formData.image) {
        setError("Please select an image");
        return;
      }

      try {
        setLoading(true);
        setLoadingOut(true);
        const imageFormData = new FormData();
        imageFormData.append("image", formData.image);

        const imageUploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: imageFormData,
        });

        if (!imageUploadResponse.ok) {
          throw new Error("Failed to upload image");
        }

        const { imageUrl } = await imageUploadResponse.json();

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
          setFormData(initialFormData);
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
        setLoadingOut(false);
      }
    },
    [formData, router]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setFormData((prev) => ({ ...prev, image: file }));
        setImagePreview(URL.createObjectURL(file));
      }
    },
    []
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { id, value } = e.target;
      setFormData((prev) => ({ ...prev, [id]: value }));
    },
    []
  );

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      )),
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Add New Product
          </h3>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mb-4">{success}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select a category</option>
                {categoryOptions}
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
                className="mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
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
                onChange={handleInputChange}
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
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed transition duration-300 ease-in-out transform hover:-translate-y-1"
              disabled={loading || loadingOut}
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
            {(loading || loadingOut) && (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}
            <button
              disabled={loadingOut || loading}
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-300 disabled:cursor-not-allowed transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              Log Out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
