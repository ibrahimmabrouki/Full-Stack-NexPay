"use client";

import { useEffect, useState } from "react";
import AdminAnnouncementForm from "@/components/admin/announcements/AdminAnnouncementForm";
import AnnouncementHistory from "@/components/admin/announcements/AnnouncementHistory";

import {
  createAnnouncement,
  getAdminAnnouncements,
} from "@/services/adminAnnouncementService";

import { Announcement } from "@/types";

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await getAdminAnnouncements(1, 10);

        setAnnouncements(res.data);
      } catch (error) {
        console.error("Failed to fetch announcements", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  // Send new announcement
  const handleSendAnnouncement = async (data: {
    title: string;
    message: string;
  }) => {
    try {
      await createAnnouncement({
        title: data.title,
        message: data.message,
      });

      // Refetch announcements after successful post
      const res = await getAdminAnnouncements(1, 10);

      setAnnouncements(res.data);
    } catch (error) {
      console.error("Failed to create announcement", error);
    }
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
                Communication Hub
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
              Announcements
            </h1>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Send notifications to all platform users and view announcement
              history.
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
              <svg
                className="w-4 h-4 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Total Sent:{" "}
                <span className="font-semibold">{announcements.length}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Create Announcement Form */}
        <div>
          <AdminAnnouncementForm onSubmit={handleSendAnnouncement} />
        </div>

        {/* Announcement History */}
        <div>
          <AnnouncementHistory
            announcements={announcements}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
