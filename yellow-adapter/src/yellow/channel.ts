/**
 * Channel operations wrappers
 * Interactúa con Yellow ClearNode via NitroRPC
 */

import type { Channel, State } from "./custodyAbi";
import { YellowRpcClient } from "../lib/yellow/rpc/client";
import { CLEARNODE_SANDBOX } from "./config";

/**
 * Channel Manager
 * Wrapper para operaciones de canal con Yellow ClearNode
 */
export class ChannelManager {
  private rpcClient: YellowRpcClient;

  constructor(wsUrl?: string) {
    this.rpcClient = new YellowRpcClient(wsUrl || CLEARNODE_SANDBOX.wsUrl);
  }

  /**
   * Create channel (NitroRPC: create_channel)
   */
  async createChannel(params: {
    channel: Channel;
    state: State;
    signatures: `0x${string}`[];
  }): Promise<any> {
    await this.rpcClient.ensureConnected();

    const response = await this.rpcClient.send({
      method: "create_channel",
      params: {
        channel: {
          chainId: params.channel.chainId.toString(),
          participants: params.channel.participants,
          challenge: params.channel.challenge.toString(),
          nonce: params.channel.nonce.toString(),
          asset: params.channel.asset,
        },
        state: {
          version: params.state.version.toString(),
          intent: params.state.intent,
          allocations: params.state.allocations.map((a) => ({
            destination: a.destination,
            amount: a.amount.toString(),
          })),
          data: params.state.data,
        },
        signatures: params.signatures,
      },
    });

    console.log("[ChannelManager] create_channel response:", response);
    return response;
  }

  /**
   * Close channel cooperatively (NitroRPC: close_channel)
   * Retorna el estado final propuesto con firma del clearnode
   */
  async closeChannel(channelId: string): Promise<{
    state: State;
    clearnodeSig: `0x${string}`;
    channel: Channel;
  }> {
    await this.rpcClient.ensureConnected();

    const response = await this.rpcClient.send({
      method: "close_channel",
      params: {
        channel_id: channelId,
      },
    });

    console.log("[ChannelManager] close_channel response:", response);

    // Parse response según formato Yellow
    // Esto puede variar según la implementación real del clearnode
    const state: State = {
      version: BigInt(response.state.version),
      intent: 3, // FINALIZE
      allocations: response.state.allocations.map((a: any) => ({
        destination: a.destination as `0x${string}`,
        amount: BigInt(a.amount),
      })),
      data: (response.state.data || "0x") as `0x${string}`,
    };

    const channel: Channel = {
      chainId: BigInt(response.channel.chainId),
      participants: response.channel.participants,
      challenge: BigInt(response.channel.challenge),
      nonce: BigInt(response.channel.nonce),
      asset: response.channel.asset,
    };

    return {
      state,
      clearnodeSig: response.signature as `0x${string}`,
      channel,
    };
  }

  /**
   * Get channel info (NitroRPC: get_channel)
   */
  async getChannel(channelId: string): Promise<any> {
    await this.rpcClient.ensureConnected();

    const response = await this.rpcClient.send({
      method: "get_channel",
      params: {
        channel_id: channelId,
      },
    });

    console.log("[ChannelManager] get_channel response:", response);
    return response;
  }

  /**
   * Update channel state (NitroRPC: update_channel)
   */
  async updateChannel(params: {
    channelId: string;
    state: State;
    signatures: `0x${string}`[];
  }): Promise<any> {
    await this.rpcClient.ensureConnected();

    const response = await this.rpcClient.send({
      method: "update_channel",
      params: {
        channel_id: params.channelId,
        state: {
          version: params.state.version.toString(),
          intent: params.state.intent,
          allocations: params.state.allocations.map((a) => ({
            destination: a.destination,
            amount: a.amount.toString(),
          })),
          data: params.state.data,
        },
        signatures: params.signatures,
      },
    });

    console.log("[ChannelManager] update_channel response:", response);
    return response;
  }

  /**
   * Disconnect RPC client
   */
  disconnect(): void {
    this.rpcClient.disconnect();
  }
}

/**
 * Singleton instance
 */
let channelManagerInstance: ChannelManager | null = null;

export function getChannelManager(): ChannelManager {
  if (!channelManagerInstance) {
    channelManagerInstance = new ChannelManager();
  }
  return channelManagerInstance;
}
