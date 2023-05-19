import { useEffect, useState } from "react";
import { DataInterface } from "../types";

const useFetch = (url: string, setErrorMessage: (arg:string) => void, showError: (arg:boolean) => void): [DataInterface[], number] => {
  const [data, setData] = useState<DataInterface[]>([]);
  const [length, setLength] = useState(0);

  useEffect(() => {
    (async () => {
      try {
      const response = await fetch(url);
      if(!response.ok){
        setErrorMessage("Something went wrong with the fetch");
        showError(true);
      }
      const data = await response.json();
      setData(data as DataInterface[]);
      setLength(data.length);
    } catch {
      setErrorMessage("Something went wrong with the fetch");
      showError(true);
    }
    })();
  }, [url]);

  return [data, length];
};

export default useFetch;
