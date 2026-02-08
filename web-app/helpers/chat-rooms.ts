export function getAblyRoomId(userOneId: string, userTwoId: string) {
  const [ orderedOneId, orderedTwoId ] = userOneId < userTwoId ? [ userOneId, userTwoId ] : [ userTwoId, userOneId ];
  return { ablyChatRoomId: `chat:${orderedOneId}:${orderedTwoId}`, orderedOneId, orderedTwoId };
}
