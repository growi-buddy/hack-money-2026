/**
 * State Packing and Hashing
 * Construye packedState canónico (abi.encode) y calcula hash
 */

import { encodeAbiParameters, keccak256, parseAbiParameters } from "viem";
import type { Channel, State, Allocation } from "./custodyAbi";

/**
 * Pack state según formato Yellow
 * 
 * Formato canónico:
 * abi.encode(
 *   (uint256 chainId, address[] participants, uint48 challenge, uint256 nonce, address asset),
 *   (uint256 version, uint8 intent, (address destination, uint256 amount)[] allocations, bytes data)
 * )
 */
export function packState(channel: Channel, state: State): `0x${string}` {
  // Pack channel
  const channelPacked = encodeAbiParameters(
    parseAbiParameters("uint256, address[], uint48, uint256, address"),
    [
      channel.chainId,
      channel.participants,
      Number(channel.challenge),
      channel.nonce,
      channel.asset,
    ]
  );

  // Pack allocations
  const allocationsPacked = state.allocations.map((alloc) => ({
    destination: alloc.destination,
    amount: alloc.amount,
  }));

  // Pack state
  const statePacked = encodeAbiParameters(
    parseAbiParameters("uint256, uint8, (address,uint256)[], bytes"),
    [
      state.version,
      state.intent,
      allocationsPacked.map((a) => [a.destination, a.amount] as const),
      state.data,
    ]
  );

  // Concatenate: channel + state
  const packed = (channelPacked + statePacked.slice(2)) as `0x${string}`;

  return packed;
}

/**
 * Hash del packed state
 */
export function hashState(channel: Channel, state: State): `0x${string}` {
  const packed = packState(channel, state);
  return keccak256(packed);
}

/**
 * Validate signature order
 * Signature Order Critical (docs):
 * - Index 0: User/Creator (participants[0])
 * - Index 1: ClearNode (participants[1] o server)
 */
export function orderSignatures(
  userSig: `0x${string}`,
  clearnodeSig: `0x${string}`,
  userIsParticipant0: boolean
): `0x${string}`[] {
  if (userIsParticipant0) {
    // User primero, clearnode segundo
    return [userSig, clearnodeSig];
  } else {
    // Clearnode primero, user segundo
    return [clearnodeSig, userSig];
  }
}

/**
 * Calculate channelId (hash of channel struct)
 */
export function calculateChannelId(channel: Channel): `0x${string}` {
  const packed = encodeAbiParameters(
    parseAbiParameters("uint256, address[], uint48, uint256, address"),
    [
      channel.chainId,
      channel.participants,
      Number(channel.challenge),
      channel.nonce,
      channel.asset,
    ]
  );
  return keccak256(packed);
}
