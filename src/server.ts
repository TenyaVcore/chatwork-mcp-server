import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import {
  acceptIncomingRequestParamsSchema,
  createRoomLinkParamsSchema,
  createRoomParamsSchema,
  createRoomTaskParamsSchema,
  deleteOrLeaveRoomParamsSchema,
  deleteRoomLinkParamsSchema,
  deleteRoomMessageParamsSchema,
  getRoomFileParamsSchema,
  getRoomLinkParamsSchema,
  getRoomMessageParamsSchema,
  getRoomParamsSchema,
  getRoomTaskParamsSchema,
  listMyTasksParamsSchema,
  listRoomFilesParamsSchema,
  listRoomMembersParamsSchema,
  listRoomMessagesParamsSchema,
  listRoomTasksParamsSchema,
  postRoomMessageParamsSchema,
  readRoomMessagesParamsSchema,
  rejectIncomingRequestParamsSchema,
  unreadRoomMessageParamsSchema,
  updateRoomLinkParamsSchema,
  updateRoomMembersParamsSchema,
  updateRoomMessageParamsSchema,
  updateRoomParamsSchema,
  updateRoomTasksStatusParamsSchema,
} from './schema';
import {
  acceptIncomingRequest,
  createRoom,
  createRoomLink,
  createRoomTask,
  deleteOrLeaveRoom,
  deleteRoomLink,
  deleteRoomMessage,
  getMe,
  getMyStatus,
  getRoom,
  getRoomFile,
  getRoomLink,
  getRoomMessage,
  getRoomTask,
  listContacts,
  listIncomingRequests,
  listMyTasks,
  listRoomFiles,
  listRoomMembers,
  listRoomMessages,
  listRooms,
  listRoomTasks,
  postRoomMessage,
  readRoomMessage,
  rejectIncomingRequest,
  unreadRoomMessage,
  updateRoom,
  updateRoomLink,
  updateRoomMembers,
  updateRoomMessage,
  updateRoomTaskStatus,
} from './toolCallbacks';

export function createChatworkServer() {
  const server = new McpServer({
    name: 'Chatwork',
    version: '0.0.1',
  });

  server.tool('get_me', '自分自身の情報を取得します。', getMe);
  server.tool(
    'get_my_status',
    '自分の未読数、自分宛ての未読の数、未完了タスク数を取得します。',
    getMyStatus,
  );
  server.tool(
    'list_my_tasks',
    '自分のタスク一覧を最大100件まで取得します。',
    listMyTasksParamsSchema.shape,
    listMyTasks,
  );
  server.tool(
    'list_contacts',
    '自分のコンタクト一覧を取得します。',
    listContacts,
  );
  server.tool('list_rooms', 'チャット一覧を取得します。', listRooms);
  server.tool(
    'create_room',
    '新しいグループチャットを作成します。',
    createRoomParamsSchema.shape,
    createRoom,
  );
  server.tool(
    'get_room',
    'チャットの情報（名前、アイコン、種類など）を取得します。',
    getRoomParamsSchema.shape,
    getRoom,
  );
  server.tool(
    'update_room',
    'チャットの情報（名前、アイコンなど）を変更します。',
    updateRoomParamsSchema.shape,
    updateRoom,
  );
  server.tool(
    'delete_or_leave_room',
    'グループチャットを退席、または削除します。グループチャットを退席すると、このグループチャットにある自分が担当者のタスク、および自分が送信したファイルがすべて削除されます。グループチャットを削除すると、このグループチャットにあるメッセージ、タスク、ファイルがすべて削除されます。（一度削除すると元に戻せません。）',
    deleteOrLeaveRoomParamsSchema.shape,
    deleteOrLeaveRoom,
  );
  server.tool(
    'list_room_members',
    'チャットのメンバー一覧を取得します。',
    listRoomMembersParamsSchema.shape,
    listRoomMembers,
  );
  server.tool(
    'update_room_members',
    'チャットのメンバーを一括で変更します。',
    updateRoomMembersParamsSchema.shape,
    updateRoomMembers,
  );
  server.tool(
    'list_room_messages',
    'チャットのメッセージ一覧を最大100件まで取得します。',
    listRoomMessagesParamsSchema.shape,
    listRoomMessages,
  );
  server.tool(
    'post_room_message',
    'チャットに新しいメッセージを投稿します。',
    postRoomMessageParamsSchema.shape,
    postRoomMessage,
  );
  server.tool(
    'read_room_messages',
    'チャットのメッセージを既読にします。',
    readRoomMessagesParamsSchema.shape,
    readRoomMessage,
  );
  server.tool(
    'unread_room_message',
    'チャットのメッセージを未読にします。',
    unreadRoomMessageParamsSchema.shape,
    unreadRoomMessage,
  );
  server.tool(
    'get_room_message',
    'チャットのメッセージを取得します。',
    getRoomMessageParamsSchema.shape,
    getRoomMessage,
  );
  server.tool(
    'update_room_message',
    'チャットのメッセージを更新します。',
    updateRoomMessageParamsSchema.shape,
    updateRoomMessage,
  );
  server.tool(
    'delete_room_message',
    'チャットのメッセージを削除します。',
    deleteRoomMessageParamsSchema.shape,
    deleteRoomMessage,
  );
  server.tool(
    'list_room_tasks',
    'チャットのタスク一覧を最大100件まで取得します。',
    listRoomTasksParamsSchema.shape,
    listRoomTasks,
  );
  server.tool(
    'create_room_task',
    'チャットに新しいタスクを追加します。',
    createRoomTaskParamsSchema.shape,
    createRoomTask,
  );
  server.tool(
    'get_room_task',
    'チャットのタスクの情報を取得します。',
    getRoomTaskParamsSchema.shape,
    getRoomTask,
  );
  server.tool(
    'update_room_task_status',
    'チャットのタスクの完了状態を変更します。',
    updateRoomTasksStatusParamsSchema.shape,
    updateRoomTaskStatus,
  );
  server.tool(
    'list_room_files',
    'チャットのファイル一覧を最大100件まで取得します。',
    listRoomFilesParamsSchema.shape,
    listRoomFiles,
  );
  server.tool(
    'get_room_file',
    'チャットのファイルの情報を取得します。',
    getRoomFileParamsSchema.shape,
    getRoomFile,
  );
  server.tool(
    'get_room_link',
    'チャットへの招待リンクを取得します。',
    getRoomLinkParamsSchema.shape,
    getRoomLink,
  );
  server.tool(
    'create_room_link',
    'チャットへの招待リンクを作成します。すでに招待リンクが作成されている場合は400エラーを返します。',
    createRoomLinkParamsSchema.shape,
    createRoomLink,
  );
  server.tool(
    'update_room_link',
    'チャットへの招待リンクを変更します。招待リンクが無効になっている場合は400エラーを返します。',
    updateRoomLinkParamsSchema.shape,
    updateRoomLink,
  );
  server.tool(
    'delete_room_link',
    'チャットへの招待リンクを削除します。招待リンクが無効になっている場合は400エラーを返します。',
    deleteRoomLinkParamsSchema.shape,
    deleteRoomLink,
  );
  server.tool(
    'list_incoming_requests',
    '自分へのコンタクト承認依頼一覧を最大100件まで取得します。',
    listIncomingRequests,
  );
  server.tool(
    'accept_incoming_request',
    '自分へのコンタクト承認依頼を承認します。',
    acceptIncomingRequestParamsSchema.shape,
    acceptIncomingRequest,
  );
  server.tool(
    'reject_incoming_request',
    '自分へのコンタクト承認依頼を拒否します。',
    rejectIncomingRequestParamsSchema.shape,
    rejectIncomingRequest,
  );

  return server;
}

type SessionRecord = {
  server: McpServer;
  transport: SSEServerTransport;
};

const sessions = new Map<string, SessionRecord>();

const ssePath = "/mcp";
const postPath = "/mcp/messages";

/**
 * SSE (Server-Sent Events) 接続のハンドラ
 * クライアント（ChatGPTなど）との持続的な接続を確立します。
 */
async function handleSseRequest(res: ServerResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const server = createChatworkServer();
  const transport = new SSEServerTransport(postPath, res);
  const sessionId = transport.sessionId;

  sessions.set(sessionId, { server, transport });

  transport.onclose = async () => {
    sessions.delete(sessionId);
    await server.close();
  };

  transport.onerror = (error) => {
    console.error("SSE transport error", error);
  };

  try {
    await server.connect(transport);
  } catch (error) {
    sessions.delete(sessionId);
    console.error("Failed to start SSE session", error);
    if (!res.headersSent) {
      res.writeHead(500).end("Failed to establish SSE connection");
    }
  }
}

/**
 * クライアントからのメッセージ（JSON-RPC）を処理するハンドラ
 * セッションIDに基づいて適切なサーバーインスタンスにメッセージを転送します。
 */
async function handlePostMessage(
  req: IncomingMessage,
  res: ServerResponse,
  url: URL
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  const sessionId = url.searchParams.get("sessionId");

  if (!sessionId) {
    res.writeHead(400).end("Missing sessionId query parameter");
    return;
  }

  const session = sessions.get(sessionId);

  if (!session) {
    res.writeHead(404).end("Unknown session");
    return;
  }

  try {
    await session.transport.handlePostMessage(req, res);
  } catch (error) {
    console.error("Failed to process message", error);
    if (!res.headersSent) {
      res.writeHead(500).end("Failed to process message");
    }
  }
}

const portEnv = Number(process.env['PORT'] ?? 8000);
const port = Number.isFinite(portEnv) ? portEnv : 8000;

const httpServer = createServer(
  async (req: IncomingMessage, res: ServerResponse) => {
    if (!req.url) {
      res.writeHead(400).end("Missing URL");
      return;
    }

    const url = new URL(req.url, `http://${req.headers.host ?? "localhost"}`);

    if (
      req.method === "OPTIONS" &&
      (url.pathname === ssePath || url.pathname === postPath)
    ) {
      res.writeHead(204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "content-type",
      });
      res.end();
      return;
    }

    if (req.method === "GET" && url.pathname === ssePath) {
      await handleSseRequest(res);
      return;
    }

    if (req.method === "POST" && url.pathname === postPath) {
      await handlePostMessage(req, res, url);
      return;
    }

    res.writeHead(404).end("Not Found");
  }
);

httpServer.on("clientError", (err: Error, socket) => {
  console.error("HTTP client error", err);
  socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
});

httpServer.listen(port, () => {
  console.log(`Chatwork MCP server listening on http://localhost:${port}`);
  console.log(`  SSE stream: GET http://localhost:${port}${ssePath}`);
  console.log(
    `  Message post endpoint: POST http://localhost:${port}${postPath}?sessionId=...`
  );
});
