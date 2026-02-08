'use client';

import { InfluencerVerificationStatus } from '@/lib/db/enums';
import { UserResponseDTO } from '@/types';
import { Pencil, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

type ApiMeta = { total: number; page: number; limit: number };

const ALL_VERIFICATION_STATUSES = Object.values(InfluencerVerificationStatus) as InfluencerVerificationStatus[];

const VERIFICATION_BADGE: Record<string, { label: string; className: string }> = {
  NONE: { label: 'None', className: 'bg-muted text-muted-foreground' },
  PENDING: { label: 'Pending', className: 'bg-amber-100 text-amber-700' },
  VERIFIED: { label: 'Verified', className: 'bg-growi-success/20 text-growi-success' },
  REJECTED: { label: 'Rejected', className: 'bg-destructive/20 text-destructive' },
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserResponseDTO[]>([]);
  const [meta, setMeta] = useState<ApiMeta>({ total: 0, page: 1, limit: 50 });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setEditingId(null);
      }
    };
    if (editingId) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [editingId]);

  const handleVerificationChange = async (userId: string, newStatus: InfluencerVerificationStatus) => {
    setUpdatingId(userId);
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ influencerVerification: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setUsers(prev =>
          prev.map(u => u.id === userId
            ? { ...u, influencerVerificationStatus: newStatus, influencerVerification: newStatus === 'VERIFIED' }
            : u,
          ),
        );
      }
    } finally {
      setUpdatingId(null);
      setEditingId(null);
    }
  };

  const totalPages = Math.max(1, Math.ceil(meta.total / meta.limit));

  const goToPage = (page: number) => {
    fetchUsers(page);
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
                <th className="px-3 py-3 font-medium">Verification</th>
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
                users.map((u) => {
                  const verStatus = u.influencerVerificationStatus || 'NONE';
                  const badge = VERIFICATION_BADGE[verStatus] || VERIFICATION_BADGE.NONE;

                  return (
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
                        <div className="relative flex items-center gap-1">
                          <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${badge.className}`}>
                            {badge.label}
                          </span>
                          {editingId === u.id ? (
                            <div ref={dropdownRef} className="absolute top-full left-0 z-50 mt-1 w-36 rounded-lg border border-border bg-popover py-1 shadow-lg">
                              <div className="flex items-center justify-between px-3 py-1 border-b border-border">
                                <span className="text-xs text-muted-foreground">Change status</span>
                                <button onClick={() => setEditingId(null)} className="text-muted-foreground hover:text-foreground">
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                              {ALL_VERIFICATION_STATUSES.map((status) => {
                                const opt = VERIFICATION_BADGE[status] || VERIFICATION_BADGE.NONE;
                                return (
                                  <button
                                    key={status}
                                    disabled={status === verStatus || updatingId === u.id}
                                    onClick={() => handleVerificationChange(u.id, status)}
                                    className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed"
                                  >
                                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${opt.className}`}>
                                      {opt.label}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          ) : (
                            <button
                              onClick={() => setEditingId(u.id)}
                              disabled={updatingId === u.id}
                              className="rounded p-0.5 text-muted-foreground hover:bg-secondary hover:text-foreground disabled:opacity-40"
                              title="Edit verification status"
                            >
                              {updatingId === u.id ? (
                                <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
                              ) : (
                                <Pencil className="h-3 w-3" />
                              )}
                            </button>
                          )}
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
                  );
                })
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
