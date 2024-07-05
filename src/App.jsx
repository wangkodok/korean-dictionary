import { useEffect } from "react";
import axios from "axios";

export default function App() {
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        "/api/search.do?certkey_no=6692&key=0D517DC9B6391075F0D67AB963CAF077&type_search=search&req_type=json&q=나무"
      );
      console.log(data);
    }
    fetchData();
  }, []);

  return <div>App</div>;
}
