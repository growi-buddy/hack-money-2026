'use client';

import { AblyChatProvider } from '@/components/providers/ably-chat-provider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useWallet } from '@/contexts/wallet-context';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { cn } from '@/lib/utils';
import type { ChatMessageEvent, Message as AblyMessage } from '@ably/chat';
import { ChatMessageEventType } from '@ably/chat';
import { ChatWindow } from '@ably/chat-react-ui-kit';
import { ChatRoomProvider, useMessages } from '@ably/chat/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, CheckCheck, Loader2, MessageSquare, Send } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

interface ChatRoomUser {
  id: string;
  name: string | null;
  walletAddress: string;
  avatar: string | null;
}

interface ChatRoomCampaign {
  id: string;
  title: string;
  status: string;
  budgetTotal: number;
  interests: string[];
  startDate: string | null;
  endDate: string | null;
  ownerId: string;
  rewardEvents: {
    name: string;
    eventType: string;
    amount: number;
  }[];
}

interface ChatRoomLastMessage {
  id: string;
  text: string;
  senderId: string;
  senderName: string | null;
  createdAt: string;
}

interface ChatRoomData {
  id: string;
  // ablyRoomId: string;
  otherUser: ChatRoomUser;
  campaign: ChatRoomCampaign | null;
  lastMessage: ChatRoomLastMessage | null;
  lastActivityAt: string;
  createdAt: string;
}

// ---- Helpers ----

function formatUserName(user: ChatRoomUser): string {
  return user.name || `${user.walletAddress.slice(0, 6)}...${user.walletAddress.slice(-4)}`;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

// ---- Chat Messages Component (inside ChatRoomProvider) ----

function ChatMessages({ currentUserId }: { currentUserId: string }) {
  const [ messages, setMessages ] = useState<AblyMessage[]>([]);
  const [ loadingHistory, setLoadingHistory ] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { sendMessage, historyBeforeSubscribe } = useMessages({
    listener: (event: ChatMessageEvent) => {
      if (event.type === ChatMessageEventType.Created) {
        setMessages((prev) => {
          const exists = prev.some((m) => m.serial === event.message.serial);
          if (exists) return prev;
          return [ ...prev, event.message ];
        });
      }
    },
  });
  
  // Load history before subscription
  useEffect(() => {
    const loadHistory = async () => {
      try {
        if (historyBeforeSubscribe) {
          const result = await historyBeforeSubscribe({ limit: 50 });
          if (result.items.length > 0) {
            setMessages(result.items.reverse());
          }
        }
      } catch (err) {
        console.error('[Chat] Failed to load history:', err);
      } finally {
        setLoadingHistory(false);
      }
    };
    loadHistory();
  }, [ historyBeforeSubscribe ]);
  
  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ messages ]);
  
  const [ inputValue, setInputValue ] = useState('');
  const [ sending, setSending ] = useState(false);
  
  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text || sending) return;
    
    setSending(true);
    setInputValue('');
    try {
      await sendMessage({ text });
    } catch (err) {
      console.error('[Chat] Failed to send:', err);
      setInputValue(text);
    } finally {
      setSending(false);
    }
  };
  
  if (loadingHistory) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-growi-blue" />
      </div>
    );
  }
  
  return (
    <>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-1 items-center justify-center py-12">
            <p className="text-sm text-muted-foreground">No messages yet. Start the conversation!</p>
          </div>
        )}
        <AnimatePresence>
          {messages.map((message, index) => {
            const isMe = message.clientId === currentUserId;
            return (
              <motion.div
                key={message.serial}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index < 20 ? index * 0.02 : 0 }}
                className={cn('flex', isMe ? 'justify-end' : 'justify-start')}
              >
                <div
                  className={cn(
                    'max-w-[80%] rounded-2xl px-4 py-2',
                    isMe
                      ? 'bg-growi-blue text-white rounded-br-sm'
                      : 'bg-secondary text-foreground rounded-bl-sm',
                  )}
                >
                  <p className="text-sm">{message.text}</p>
                  <div
                    className={cn(
                      'mt-1 flex items-center justify-end gap-1 text-xs',
                      isMe ? 'text-white/70' : 'text-muted-foreground',
                    )}
                  >
                    <span>
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    {isMe && <CheckCheck className="h-3 w-3" />}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <div className="border-t border-border p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <Input
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1"
            disabled={sending}
          />
          <Button
            type="submit"
            className="bg-growi-blue text-white hover:bg-growi-blue/90"
            disabled={sending || !inputValue.trim()}
          >
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </div>
    </>
  );
}

// ---- Main Inbox Page ----

export default function InfluencerInboxPage() {
  const { address, isConnected } = useWallet();
  const searchParams = useSearchParams();
  const roomIdParam = searchParams.get('roomId');
  const [ chatRooms, setChatRooms ] = useState<ChatRoomData[]>([]);
  const [ selectedRoom, setSelectedRoom ] = useState<ChatRoomData | null>(null);
  const [ showMobileChat, setShowMobileChat ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  const [ initialRoomSelected, setInitialRoomSelected ] = useState(false);
  
  const fetchRooms = useCallback(async () => {
    if (!address) {
      setChatRooms([]);
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const res = await fetch(`/api/influencer/${address}/chat-rooms`);
      const data = await res.json();
      
      if (res.ok && data.success) {
        setChatRooms(data.data.chatRooms);
      }
    } catch (err) {
      console.error('[Inbox] Failed to fetch rooms:', err);
    } finally {
      setLoading(false);
    }
  }, [ address ]);
  
  useEffect(() => {
    fetchRooms();
  }, [ fetchRooms ]);
  
  // Auto-select room from URL param or fallback to first room
  useEffect(() => {
    if (chatRooms.length > 0 && !initialRoomSelected) {
      if (roomIdParam) {
        const targetRoom = chatRooms.find((r) => r.id === roomIdParam);
        if (targetRoom) {
          setSelectedRoom(targetRoom);
          setShowMobileChat(true);
          setInitialRoomSelected(true);
          return;
        }
      }
      // Fallback: select first room
      if (!selectedRoom) {
        setSelectedRoom(chatRooms[0]);
      }
      setInitialRoomSelected(true);
    }
  }, [ chatRooms, roomIdParam, initialRoomSelected, selectedRoom ]);
  
  const handleSelectRoom = (room: ChatRoomData) => {
    setSelectedRoom(room);
    setShowMobileChat(true);
  };
  
  const handleBack = () => {
    setShowMobileChat(false);
  };
  
  if (!isConnected) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        <div className="text-center">
          <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <p className="mt-4 text-muted-foreground">Connect your wallet to view messages</p>
        </div>
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-growi-blue" />
      </div>
    );
  }
  
  console.log({ chatRooms, selectedRoom });
  const roomId = `${selectedRoom?.campaign?.id}_${selectedRoom?.campaign?.ownerId}_${selectedRoom?.otherUser?.id}`;
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Messages</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Connect with campaign managers about opportunities
        </p>
      </div>
      
      <AblyChatProvider clientId={address!}>
        <div className="flex h-[calc(100vh-8rem)] gap-4 overflow-hidden">
          {/* Conversations List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
              'w-full shrink-0 overflow-y-auto rounded-lg border border-border bg-card md:w-80',
              showMobileChat && 'hidden md:block',
            )}
          >
            <div className="border-b border-border p-4">
              <h2 className="font-semibold text-foreground">Messages</h2>
              <p className="text-sm text-muted-foreground">{chatRooms.length} conversations</p>
            </div>
            
            {chatRooms.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center px-4">
                <MessageSquare className="h-10 w-10 text-muted-foreground/30" />
                <p className="mt-3 text-sm text-muted-foreground">No conversations yet</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Messages from campaign managers will appear here
                </p>
              </div>
            ) : (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="divide-y divide-border"
              >
                {chatRooms.map((room) => (
                  <motion.div
                    key={room.id}
                    variants={staggerItem}
                    onClick={() => handleSelectRoom(room)}
                    className={cn(
                      'flex cursor-pointer items-start gap-3 p-4 transition-colors hover:bg-secondary/50',
                      selectedRoom?.id === room.id && 'bg-secondary/50',
                    )}
                  >
                    <div className="relative shrink-0">
                      <Image
                        src={room.otherUser.avatar || '/growi-mascot.png'}
                        alt={formatUserName(room.otherUser)}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-foreground">{formatUserName(room.otherUser)}</p>
                        <span className="text-xs text-muted-foreground">
                          {room.lastMessage ? timeAgo(room.lastMessage.createdAt) : timeAgo(room.createdAt)}
                        </span>
                      </div>
                      {room.campaign && (
                        <p className="text-xs text-growi-blue">{room.campaign.title}</p>
                      )}
                      <p className="mt-1 truncate text-sm text-muted-foreground">
                        {room.lastMessage?.text || 'No messages yet'}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
          
          {/* Chat Area */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
              'flex flex-1 flex-col overflow-hidden rounded-lg border border-border bg-card',
              !showMobileChat && 'hidden md:flex',
            )}
          >
            {selectedRoom ? (
              <>
                {/* Chat Header */}
                <div className="flex items-center gap-3 border-b border-border p-4">
                  <Button variant="ghost" size="icon" className="md:hidden" onClick={handleBack}>
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <Image
                    src={selectedRoom.otherUser.avatar || '/growi-mascot.png'}
                    alt={formatUserName(selectedRoom.otherUser)}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground">{formatUserName(selectedRoom.otherUser)}</p>
                    {selectedRoom.campaign && (
                      <Badge
                        className={cn(
                          'text-xs',
                          selectedRoom.campaign.status === 'ACTIVE' && 'bg-growi-success/20 text-growi-success',
                          selectedRoom.campaign.status === 'COMPLETED' && 'bg-growi-blue/20 text-growi-blue',
                          selectedRoom.campaign.status === 'PAUSED' && 'bg-growi-yellow/20 text-growi-yellow',
                        )}
                      >
                        {selectedRoom.campaign.status}
                      </Badge>
                    )}
                  </div>
                </div>
                {/* Campaign Details Card */}
                {selectedRoom.campaign && (
                  <div className="border-b border-border p-4">
                    <Card className="bg-growi-blue/5 border-growi-blue/20">
                      <CardContent className="p-4">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <p className="font-semibold text-foreground">{selectedRoom.campaign.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {selectedRoom.campaign.startDate
                                ? new Date(selectedRoom.campaign.startDate).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                })
                                : 'TBD'}
                              {' - '}
                              {selectedRoom.campaign.endDate
                                ? new Date(selectedRoom.campaign.endDate).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                })
                                : 'TBD'}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-foreground">
                              Budget: ${selectedRoom.campaign.budgetTotal.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        {selectedRoom.campaign.rewardEvents.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-4 text-sm">
                            {selectedRoom.campaign.rewardEvents.map((event, i) => {
                              const labels: Record<string, string> = {
                                LANDING_PAGE_VIEW: 'View',
                                VIEW_ITEM: 'View Item',
                                ADD_TO_CART: 'Add to Cart',
                                CHECKOUT: 'Checkout',
                                PURCHASE_SUCCESS: 'Purchase',
                              };
                              return (
                                <div key={i}>
                                  <span className="text-muted-foreground">{labels[event.eventType] || event.eventType}:</span>
                                  <span className="font-medium text-growi-money">${event.amount.toFixed(3)}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        {selectedRoom.campaign.interests.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1">
                            {selectedRoom.campaign.interests.map((interest) => (
                              <Badge key={interest} variant="secondary" className="text-xs">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}
                {/* Chat Room with Ably */}
                <ChatRoomProvider key={roomId} name={roomId}>
                  <ChatWindow
                    roomName={roomId}
                    className="window-container-chat"
                    enableTypingIndicators
                    autoEnterPresence
                  />
                  s
                </ChatRoomProvider>
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="mx-auto h-10 w-10 text-muted-foreground/30" />
                  <p className="mt-3 text-muted-foreground">Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </AblyChatProvider>
    </div>
  );
}
