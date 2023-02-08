import useWebSocket from "react-use-websocket";

const WS_URL = "ws://127.0.0.1:1881/ws1";

export default function Page() {
  useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
  });

  return (
    <>
      <div>onta</div>
    </>
  );
}
