'use client';

import { CampaignResponseDTO } from '@/types';
import { useCallback, useEffect, useState } from 'react';

type ApiMeta = { total: number; page: number; limit: number };

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState<(CampaignResponseDTO & { escrowAddress?: string })[]>([]);
  const [meta, setMeta] = useState<ApiMeta>({ total: 0, page: 1, limit: 50 });
  const [loading, setLoading] = useState(false);
  const [ownerWallet, setOwnerWallet] = useState('');
  const [filterInput, setFilterInput] = useState('');

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
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Admin - All Campaigns</h1>
          <p className="text-sm text-gray-400 mt-1">
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
            className="flex-1 max-w-lg rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={handleFilter}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Filter
          </button>
          {ownerWallet && (
            <button
              onClick={handleClear}
              className="rounded-md border border-gray-700 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800"
            >
              Clear
            </button>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-800">
          <table className="w-full text-sm">
            <thead className="bg-gray-900 text-gray-400 text-left">
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
                <th className="px-3 py-3 font-medium">Escrow</th>
                <th className="px-3 py-3 font-medium">Deleted</th>
                <th className="px-3 py-3 font-medium">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {loading ? (
                <tr>
                  <td colSpan={18} className="px-3 py-8 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : campaigns.length === 0 ? (
                <tr>
                  <td colSpan={18} className="px-3 py-8 text-center text-gray-500">
                    No campaigns found
                  </td>
                </tr>
              ) : (
                campaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-900/50">
                    <td className="px-3 py-2 font-medium max-w-[200px] truncate" title={c.title}>
                      {c.title}
                    </td>
                    <td className="px-3 py-2">
                      <StatusBadge status={c.status} />
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
                    <td className="px-3 py-2 font-mono text-xs max-w-[120px] truncate" title={c.escrowAddress}>
                      {c.escrowAddress ? `${c.escrowAddress.slice(0, 6)}...${c.escrowAddress.slice(-4)}` : '-'}
                    </td>
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

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    DRAFT: 'bg-gray-700 text-gray-300',
    PUBLISHED: 'bg-blue-900 text-blue-300',
    ACTIVE: 'bg-green-900 text-green-300',
    PAUSED: 'bg-yellow-900 text-yellow-300',
    DEPLETED: 'bg-orange-900 text-orange-300',
    EXPIRED: 'bg-red-900 text-red-300',
    COMPLETED: 'bg-purple-900 text-purple-300',
  };

  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${colors[status] || 'bg-gray-700 text-gray-300'}`}>
      {status}
    </span>
  );
}
