import { useEffect, useState } from "react";
import useRequest from "./useRequest";

interface City {
  id: string;
  name: string;
  state: string;
  country: string;
}
const useCities = () => {
  const { loading: cityLoading, makeRequest } = useRequest("/profiles/cities");
  const [cities, setCities] = useState<City[]>([]);
  useEffect(() => {
    fetchCities();
  }, []);
  const fetchCities = async () => {
    const res = await makeRequest();
    if (res.status === "success") {
      setCities([...res.data]);
    }
  };
  return { cities, cityLoading };
};

export default useCities;
