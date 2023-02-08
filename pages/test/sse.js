import { useEffect, useState } from "react";

const URL = "http://localhost:1881/sse";

export default function Page() {
  const [test, setTest] = useState(null);
  useEffect(() => {
    const sse = new EventSource(URL);

    function getRealtimeData(data) {
      setTest(data);
    }

    sse.addEventListener("open", e => {
      console.log(e);
    });

    sse.addEventListener("message", e => {
      console.log(e);
      return getRealtimeData(data);
    });

    // sse.onerror = () => {
    //   sse.close();
    // };

    return () => {
      sse.close();
    };
  }, []);

  return (
    <>
      <div>sse</div>
      <div>{test !== null ? test.test : "no data"}</div>
    </>
  );
}
