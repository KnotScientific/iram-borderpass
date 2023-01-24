import { useEffect, useState } from "react";
import { DataInterface } from "../types";

const useFetch = (url: string): [DataInterface[], number] => {
  const [data, setData] = useState<DataInterface[]>([]);
  const [length, setLength] = useState(0);

  useEffect(() => {
    (async () => {
      const response = await fetch(url);
      const data = await response.json();
      setData(data as DataInterface[]);
      setLength(data.length);
    })();
  }, [url]);

  return [data, length];
};

export default useFetch;
