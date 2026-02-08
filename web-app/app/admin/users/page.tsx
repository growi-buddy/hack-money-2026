'use client';

import { InfluencerVerificationStatus } from '@/lib/db/enums';
import { UserResponseDTO } from '@/types';
import { useCallback, useEffect, useState } from 'react';

type ApiMeta = { total: number; page: number; limit: number };

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserResponseDTO[]>([]);
  const [meta, setMeta] = useState<ApiMeta>({ total: 0, page: 1, limit: 50 });
  const [loading, setLoading] = useState(false);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

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

  const updateVerificationStatus = async (userId: string, status: InfluencerVerificationStatus) => {
    setUpdatingUserId(userId);
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ influencerVerification: status }),
      });

      if (res.ok) {
        // Update local state
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, influencerVerification: status } : user,
          ),
        );
      } else {
        alert('Failed to update verification status');
      }
    } catch (error) {
      console.error('Error updating verification status:', error);
      alert('Error updating verification status');
    } finally {
      setUpdatingUserId(null);
    }
  };

  const getVerificationBadge = (status: InfluencerVerificationStatus) => {
    switch (status) {
      case InfluencerVerificationStatus.VERIFIED:
        return 'bg-growi-success/20 text-growi-success';
      case InfluencerVerificationStatus.PENDING:
        return 'bg-yellow-500/20 text-yellow-600';
      case InfluencerVerificationStatus.REJECTED:
        return 'bg-red-500/20 text-red-600';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getVerificationLabel = (status: InfluencerVerificationStatus) => {
    switch (status) {
      case InfluencerVerificationStatus.VERIFIED:
        return 'Verified';
      case InfluencerVerificationStatus.PENDING:
        return 'Pending';
      case InfluencerVerificationStatus.REJECTED:
        return 'Rejected';
      default:
        return 'None';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin - All Users</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Showing all registered users ({meta.total} total)
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-muted-foreground text-left">
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
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={10} className="px-3 py-8 text-center text-muted-foreground">
                    Loading...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-3 py-8 text-center text-muted-foreground">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-secondary/50 transition-colors">
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
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getVerificationBadge(
                            u.influencerVerification,
                          )}`}
                        >
                          {getVerificationLabel(u.influencerVerification)}
                        </span>
                        <select
                          value={u.influencerVerification}
                          onChange={(e) =>
                            updateVerificationStatus(
                              u.id,
                              e.target.value as InfluencerVerificationStatus,
                            )
                          }
                          disabled={updatingUserId === u.id}
                          className="rounded border border-border bg-background px-2 py-1 text-xs text-foreground hover:border-growi-blue/50 focus:border-growi-blue focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option value={InfluencerVerificationStatus.NONE}>None</option>
                          <option value={InfluencerVerificationStatus.PENDING}>Pending</option>
                          <option value={InfluencerVerificationStatus.VERIFIED}>Verified</option>
                          <option value={InfluencerVerificationStatus.REJECTED}>Rejected</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      {u.socialMedias.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {u.socialMedias.map((sm, i) => (
                            <span
                              key={i}
                              className="inline-block rounded bg-secondary px-1.5 py-0.5 text-xs text-muted-foreground"
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
            <span className="text-muted-foreground">
              Page {meta.page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => goToPage(meta.page - 1)}
                disabled={meta.page <= 1}
                className="rounded-lg border border-border px-3 py-1 text-muted-foreground hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => goToPage(meta.page + 1)}
                disabled={meta.page >= totalPages}
                className="rounded-lg border border-border px-3 py-1 text-muted-foreground hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed"
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
