'use client';

import { UserResponseDTO } from '@/types';
import { useCallback, useEffect, useState } from 'react';

type ApiMeta = { total: number; page: number; limit: number };

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserResponseDTO[]>([]);
  const [meta, setMeta] = useState<ApiMeta>({ total: 0, page: 1, limit: 50 });
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: '50',
      });
      const res = await fetch(`/api/users?${params}`);
      const json = await res.json();
      if (json.success) {
        setUsers(json.data);
        setMeta(json.meta);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers(1);
  }, [fetchUsers]);

  const totalPages = Math.max(1, Math.ceil(meta.total / meta.limit));

  const goToPage = (page: number) => {
    fetchUsers(page);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Admin - All Users</h1>
          <p className="text-sm text-gray-400 mt-1">
            Showing all registered users ({meta.total} total)
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-800">
          <table className="w-full text-sm">
            <thead className="bg-gray-900 text-gray-400 text-left">
              <tr>
                <th className="px-3 py-3 font-medium">Name</th>
                <th className="px-3 py-3 font-medium">Wallet</th>
                <th className="px-3 py-3 font-medium">Email</th>
                <th className="px-3 py-3 font-medium">Phone</th>
                <th className="px-3 py-3 font-medium">Location</th>
                <th className="px-3 py-3 font-medium">Bio</th>
                <th className="px-3 py-3 font-medium">Interests</th>
                <th className="px-3 py-3 font-medium">Affinities</th>
                <th className="px-3 py-3 font-medium">Verified</th>
                <th className="px-3 py-3 font-medium">Social Media</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {loading ? (
                <tr>
                  <td colSpan={10} className="px-3 py-8 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-3 py-8 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-900/50">
                    <td className="px-3 py-2 whitespace-nowrap font-medium">{u.name || '-'}</td>
                    <td className="px-3 py-2 font-mono text-xs" title={u.walletAddress}>
                      {u.walletAddress.slice(0, 6)}...{u.walletAddress.slice(-4)}
                    </td>
                    <td className="px-3 py-2">{u.email || '-'}</td>
                    <td className="px-3 py-2">{u.phone || '-'}</td>
                    <td className="px-3 py-2">{u.location || '-'}</td>
                    <td className="px-3 py-2 max-w-[200px] truncate" title={u.bio}>
                      {u.bio || '-'}
                    </td>
                    <td className="px-3 py-2 max-w-[150px] truncate" title={u.interests.join(', ')}>
                      {u.interests.length > 0 ? u.interests.join(', ') : '-'}
                    </td>
                    <td className="px-3 py-2 max-w-[150px] truncate" title={u.affinities.join(', ')}>
                      {u.affinities.length > 0 ? u.affinities.join(', ') : '-'}
                    </td>
                    <td className="px-3 py-2 text-center">
                      {u.influencerVerification ? (
                        <span className="inline-block rounded-full bg-green-900 px-2 py-0.5 text-xs font-medium text-green-300">
                          Verified
                        </span>
                      ) : (
                        <span className="inline-block rounded-full bg-gray-700 px-2 py-0.5 text-xs font-medium text-gray-400">
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      {u.socialMedias.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {u.socialMedias.map((sm, i) => (
                            <span
                              key={i}
                              className="inline-block rounded bg-gray-800 px-1.5 py-0.5 text-xs text-gray-300"
                              title={`${sm.platform}: ${sm.username} (${sm.followers} followers)`}
                            >
                              {sm.platform}
                            </span>
                          ))}
                        </div>
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">
              Page {meta.page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => goToPage(meta.page - 1)}
                disabled={meta.page <= 1}
                className="rounded-md border border-gray-700 px-3 py-1 text-gray-300 hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => goToPage(meta.page + 1)}
                disabled={meta.page >= totalPages}
                className="rounded-md border border-gray-700 px-3 py-1 text-gray-300 hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
