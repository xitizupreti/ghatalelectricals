"use client";
import AdminPanel from "./AdminPanel";

export default function AdminPage() {
  return (
    <section id="admin" className="p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Admin Panel
      </h2>
      <AdminPanel />
    </section>
  );
}
