'use client';

import { CampaignStatusBadge } from '@/components/campaigns/CampaignStatusBadge';
import { CampaignStatus } from '@/lib/db/enums';
import { CampaignResponseDTO } from '@/types';
import { Pencil, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

type ApiMeta = { total: number; page: number; limit: number };

const ALL_STATUSES = Object.values(CampaignStatus) as CampaignStatus[];

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState<CampaignResponseDTO[]>([]);
  const [meta, setMeta] = useState<ApiMeta>({ total: 0, page: 1, limit: 50 });
  const [loading, setLoading] = useState(false);
  const [ownerWallet, setOwnerWallet] = useState('');
  const [filterInput, setFilterInput] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchCampaigns = useCallback(async (page: number, wallet: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        isAdmin: 'true',
        page: String(page),
        limit: '50',
      });
      if (wallet) params.set('ownerWallet', wallet);

      const res = await fetch(`/api/campaigns/all?${params}`);
      const json = await res.json();
      if (json.success) {
        setCampaigns(json.data);
        setMeta(json.meta);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCampaigns(meta.page, ownerWallet);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleStatusChange = async (campaignId: string, newStatus: CampaignStatus) => {
    setUpdatingId(campaignId);
    try {
      const res = await fetch(`/api/campaigns/${campaignId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setCampaigns(prev =>
          prev.map(c => c.id === campaignId ? { ...c, status: newStatus } : c),
        );
      }
    } finally {
      setUpdatingId(null);
      setEditingId(null);
    }
  };

  const handleFilter = () => {
    setOwnerWallet(filterInput);
    fetchCampaigns(1, filterInput);
  };

  const handleClear = () => {
    setFilterInput('');
    setOwnerWallet('');
    fetchCampaigns(1, '');
  };

  const totalPages = Math.max(1, Math.ceil(meta.total / meta.limit));

  const goToPage = (page: number) => {
    fetchCampaigns(page, ownerWallet);
  };

  const formatDate = (ts: number) => {
    if (!ts) return '-';
    return new Date(ts).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  };

  const formatCurrency = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin - All Campaigns</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Showing all campaigns regardless of status or ownership ({meta.total} total)
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Filter by owner wallet address..."
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
            className="flex-1 max-w-lg rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:border-growi-lime focus:outline-none focus:ring-1 focus:ring-growi-lime"
          />
          <button
            onClick={handleFilter}
            className="rounded-lg bg-growi-lime px-4 py-2 text-sm font-medium text-foreground hover:bg-growi-lime/80"
          >
            Filter
          </button>
          {ownerWallet && (
            <button
              onClick={handleClear}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary"
            >
              Clear
            </button>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-muted-foreground text-left">
              <tr>
                <th className="px-3 py-3 font-medium">Title</th>
                <th className="px-3 py-3 font-medium">Status</th>
                <th className="px-3 py-3 font-medium">Owner</th>
                <th className="px-3 py-3 font-medium">Owner Wallet</th>
                <th className="px-3 py-3 font-medium">Budget</th>
                <th className="px-3 py-3 font-medium">Spent</th>
                <th className="px-3 py-3 font-medium">Slots</th>
                <th className="px-3 py-3 font-medium">Participants</th>
                <th className="px-3 py-3 font-medium">Hot</th>
                <th className="px-3 py-3 font-medium">Interests</th>
                <th className="px-3 py-3 font-medium">Demographics</th>
                <th className="px-3 py-3 font-medium">Regions</th>
                <th className="px-3 py-3 font-medium">Countries</th>
                <th className="px-3 py-3 font-medium">Start</th>
                <th className="px-3 py-3 font-medium">End</th>
                <th className="px-3 py-3 font-medium">Deleted</th>
                <th className="px-3 py-3 font-medium">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={17} className="px-3 py-8 text-center text-muted-foreground">
                    Loading...
                  </td>
                </tr>
              ) : campaigns.length === 0 ? (
                <tr>
                  <td colSpan={17} className="px-3 py-8 text-center text-muted-foreground">
                    No campaigns found
                  </td>
                </tr>
              ) : (
                campaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-secondary/50 transition-colors">
                    <td className="px-3 py-2 font-medium max-w-[200px] truncate" title={c.title}>
                      {c.title}
                    </td>
                    <td className="px-3 py-2">
                      <div className="relative flex items-center gap-1">
                        <CampaignStatusBadge status={c.status} />
                        {editingId === c.id ? (
                          <div ref={dropdownRef} className="absolute top-full left-0 z-50 mt-1 w-40 rounded-lg border border-border bg-popover py-1 shadow-lg">
                            <div className="flex items-center justify-between px-3 py-1 border-b border-border">
                              <span className="text-xs text-muted-foreground">Change status</span>
                              <button onClick={() => setEditingId(null)} className="text-muted-foreground hover:text-foreground">
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                            {ALL_STATUSES.map((status) => (
                              <button
                                key={status}
                                disabled={status === c.status || updatingId === c.id}
                                onClick={() => handleStatusChange(c.id, status)}
                                className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed"
                              >
                                <CampaignStatusBadge status={status} />
                              </button>
                            ))}
                          </div>
                        ) : (
                          <button
                            onClick={() => setEditingId(c.id)}
                            disabled={updatingId === c.id}
                            className="rounded p-0.5 text-muted-foreground hover:bg-secondary hover:text-foreground disabled:opacity-40"
                            title="Edit status"
                          >
                            {updatingId === c.id ? (
                              <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
                            ) : (
                              <Pencil className="h-3 w-3" />
                            )}
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">{c.owner.name || '-'}</td>
                    <td className="px-3 py-2 font-mono text-xs max-w-[120px] truncate" title={c.owner.walletAddress}>
                      {c.owner.walletAddress.slice(0, 6)}...{c.owner.walletAddress.slice(-4)}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">{formatCurrency(c.budgetTotal)}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{formatCurrency(c.budgetSpent)}</td>
                    <td className="px-3 py-2 text-center">{c.slots}</td>
                    <td className="px-3 py-2 text-center">{c.participants.length}</td>
                    <td className="px-3 py-2 text-center">{c.isHot ? '🔥' : '-'}</td>
                    <td className="px-3 py-2 max-w-[150px] truncate" title={c.interests.join(', ')}>
                      {c.interests.length > 0 ? c.interests.join(', ') : '-'}
                    </td>
                    <td className="px-3 py-2 max-w-[150px] truncate" title={c.demographics.join(', ')}>
                      {c.demographics.length > 0 ? c.demographics.join(', ') : '-'}
                    </td>
                    <td className="px-3 py-2 max-w-[100px] truncate" title={c.regions.join(', ')}>
                      {c.regions.length > 0 ? c.regions.join(', ') : '-'}
                    </td>
                    <td className="px-3 py-2 max-w-[100px] truncate" title={c.countries.join(', ')}>
                      {c.countries.length > 0 ? c.countries.join(', ') : '-'}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">{formatDate(c.startDate)}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{formatDate(c.endDate)}</td>
                    <td className="px-3 py-2 text-center">{c.isDeleted ? 'Yes' : 'No'}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{formatDate(c.createdAt)}</td>
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
