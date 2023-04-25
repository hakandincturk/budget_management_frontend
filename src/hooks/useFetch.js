import React, { useEffect, useState } from "react";
import axios from "axios";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${process.env.REACT_APP_MAIN_URL}${url}`, {'headers': {'access-token': localStorage.getItem('access-token')}});
        setData(res.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchUser();
  }, [url]);

  const reFetchUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_MAIN_URL}${url}`, {'headers': {'access-token': localStorage.getItem('access-token')}});
      setData(res.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetchUser };
}

export default useFetch;
