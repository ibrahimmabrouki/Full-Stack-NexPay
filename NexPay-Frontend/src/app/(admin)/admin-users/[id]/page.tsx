"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { updateAdminUser } from "@/services/adminUserService";
import { getAdminUserById } from "@/services/adminUserService";
import { updateAdminUserCredentials } from "@/services/adminUserService";
import { AdminUserDetailsResponse } from "@/types";
import UserDetailsSkeleton from "@/components/admin/skeletons/UserDetailsSkeleton";

export default function AdminUserDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;
  const [user, setUser] = useState<AdminUserDetailsResponse["user"] | null>(
    null,
  );

  const [form, setForm] = useState({
    full_name: "",
    country_code: "",
    phone_number: "",
    address: "",
    is_active: false,
    new_password: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getAdminUserById(userId);
        setUser(res.user);
        setForm({
          full_name: res.user.full_name,
          country_code: res.user.country_code,
          phone_number: res.user.phone_number,
          address: res.user.address || "",
          is_active: res.user.is_active,
          new_password: "",
        });
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    if (userId) fetchUser();
  }, [userId]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  if (loading || !user) {
    return <UserDetailsSkeleton />;
  }

  const getRoleBadge = (role: string) => {
    const roleLower = role?.toLowerCase();
    if (roleLower === "staff" || roleLower === "admin") {
      return "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300";
    }
    if (roleLower === "company") {
      return "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300";
    }
    return "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300";
  };

  const getStatusBadge = (isActive: boolean) => {
    if (isActive) {
      return {
        color:
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
        icon: "✓",
        label: "Active",
      };
    }
    return {
      color: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300",
      icon: "✗",
      label: "Disabled",
    };
  };

  const statusBadge = getStatusBadge(user.is_active);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      setMessage(null);

      if (form.new_password && form.new_password.length < 6) {
        setMessage({
          type: "error",
          text: "Password must be at least 6 characters",
        });
        return;
      }

      await updateAdminUser(user.id, {
        full_name: form.full_name,
        country_code: form.country_code,
        phone_number: form.phone_number,
        address: form.address,
        is_active: form.is_active,
      });

      if (form.new_password.trim()) {
        await updateAdminUserCredentials({
          user_id: user.id,
          new_password: form.new_password,
        });
      }

      setMessage({ type: "success", text: "User updated successfully!" });
      setIsEditing(false);

      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error(error);
      setMessage({
        type: "error",
        text: "Failed to update user. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setForm({
      full_name: user.full_name,
      country_code: user.country_code,
      phone_number: user.phone_number,
      address: user.address || "",
      is_active: user.is_active,
      new_password: "",
    });
    setIsEditing(false);
    setMessage(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-800/50 rounded-2xl p-6 border border-gray-200 dark:border-slate-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-green-600 dark:text-green-400 uppercase tracking-wider">
                User Management
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
              User Details
            </h1>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              View and update user information
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Status Badge */}
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${statusBadge.color}`}
            >
              <span>{statusBadge.icon}</span>
              {statusBadge.label}
            </div>

            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all duration-200"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Users
            </button>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-indigo-600 dark:text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Profile Information
              </h2>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 rounded-lg transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                Edit User
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCancel}
                  className="px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          {/* Success/Error Message */}
          {message && (
            <div
              className={`mb-6 p-4 rounded-xl ${message.type === "success" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400" : "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400"}`}
            >
              <div className="flex items-center gap-2">
                {message.type === "success" ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
                <span className="text-sm">{message.text}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-5">
              {/* User ID (Read-only) */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  User ID
                </label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-4 py-2.5 text-sm font-mono rounded-xl bg-gray-50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300">
                    {user.id}
                  </code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(user.id);
                      setMessage({
                        type: "success",
                        text: "User ID copied to clipboard!",
                      });
                      setTimeout(() => setMessage(null), 2000);
                    }}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    title="Copy ID"
                  >
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    value={form.full_name}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        full_name: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                ) : (
                  <p className="px-4 py-2.5 text-sm text-gray-800 dark:text-white bg-gray-50 dark:bg-slate-700/30 rounded-xl">
                    {user.full_name}
                  </p>
                )}
              </div>

              {/* Country Code */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Country Code
                </label>
                {isEditing ? (
                  <input
                    value={form.country_code}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        country_code: e.target.value,
                      }))
                    }
                    placeholder="+1"
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                ) : (
                  <p className="px-4 py-2.5 text-sm text-gray-800 dark:text-white bg-gray-50 dark:bg-slate-700/30 rounded-xl">
                    {user.country_code || "-"}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    value={form.phone_number}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        phone_number: e.target.value,
                      }))
                    }
                    placeholder="Phone number"
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                ) : (
                  <p className="px-4 py-2.5 text-sm text-gray-800 dark:text-white bg-gray-50 dark:bg-slate-700/30 rounded-xl">
                    {user.phone_number || "-"}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    rows={3}
                    value={form.address}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, address: e.target.value }))
                    }
                    placeholder="Enter address"
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                  />
                ) : (
                  <div className="px-4 py-2.5 text-sm text-gray-800 dark:text-white bg-gray-50 dark:bg-slate-700/30 rounded-xl min-h-[80px]">
                    {user.address || "Not provided"}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-5">
              {isEditing && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">New Password</label>
                  <input
                    type="password"
                    name="new_password"
                    value={form.new_password}
                    onChange={handleChange}
                    placeholder="Enter new password (optional)"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                  <p className="text-xs text-gray-500">
                    Leave empty if you don’t want to change password
                  </p>
                </div>
              )}
              {/* Role (Read-only) */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Role
                </label>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold ${getRoleBadge(user.role)}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
                    {user.role}
                  </span>
                  <span className="text-xs text-gray-500">
                    (Cannot be changed)
                  </span>
                </div>
              </div>

              {/* Status (Active/Inactive) */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Account Status
                </label>
                {isEditing ? (
                  <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-slate-700/30 rounded-xl">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={form.is_active === true}
                        onChange={() =>
                          setForm((prev) => ({ ...prev, is_active: true }))
                        }
                        className="w-4 h-4 text-indigo-600"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Active
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={form.is_active === false}
                        onChange={() =>
                          setForm((prev) => ({ ...prev, is_active: false }))
                        }
                        className="w-4 h-4 text-red-600"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Disabled
                      </span>
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold ${statusBadge.color}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${user.is_active ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`}
                      ></span>
                      {statusBadge.label}
                    </span>
                  </div>
                )}
              </div>

              {/* Created At (Read-only) */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Created At
                </label>
                <div className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-800 dark:text-white bg-gray-50 dark:bg-slate-700/30 rounded-xl">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {formatDate(user.created_at)}
                </div>
              </div>

              {/* Wallet Balances */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Wallet Balances
                </label>

                {user.wallets && user.wallets.wallet_balances?.length > 0 ? (
                  <div className="space-y-2">
                    {user.wallets.wallet_balances.map((bal) => {
                      const getCurrencyColor = (currency: string) => {
                        switch (currency) {
                          case "USD":
                            return "text-emerald-600 dark:text-emerald-400";
                          case "EUR":
                            return "text-blue-600 dark:text-blue-400";
                          case "LBP":
                            return "text-amber-600 dark:text-amber-400";
                          default:
                            return "text-gray-600 dark:text-gray-400";
                        }
                      };

                      const getCurrencyIcon = (currency: string) => {
                        switch (currency) {
                          case "USD":
                            return "$";
                          case "EUR":
                            return "€";
                          case "LBP":
                            return "ل.ل";
                          default:
                            return "";
                        }
                      };

                      return (
                        <div
                          key={bal.currency}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/30 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${getCurrencyColor(bal.currency)} bg-white dark:bg-slate-800 shadow-sm`}
                            >
                              <span className="text-sm font-bold">
                                {getCurrencyIcon(bal.currency)}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800 dark:text-white text-sm">
                                {bal.currency}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Available
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p
                              className={`font-bold text-base ${getCurrencyColor(bal.currency)}`}
                            >
                              {getCurrencyIcon(bal.currency)}
                              {Number(bal.available_balance).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-gray-50 dark:bg-slate-700/30 rounded-xl">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No wallet found
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
