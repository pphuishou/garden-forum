import { useEffect, useState } from "react";
import { reqChannelList } from "@/apis/article";

function useChannel () {
  const [ channelList, setChannelList ] = useState([]);
  useEffect(() => {
    const getChannelList = async () => {
      const result = await reqChannelList();
      setChannelList(result.data.channels);
    };
    getChannelList();
  }, []);

  return { channelList };
}

export { useChannel };