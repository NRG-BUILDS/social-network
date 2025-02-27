import { useState } from "react";
import { convertToFormData } from "@/lib/helperFunctions";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { updateToken } from "@/store/authSlice";

// Define a general shape for request data
interface RequestData {
  [key: string]: any;
}

// Define a general type for the return type of the request
interface UseRequestReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  makeRequest: (
    requestData?: RequestData | null,
    method?: string,
    contentType?: string,
    url_with_slug?: string | null
  ) => Promise<T | undefined>;
}

// Add the useAuth parameter with a default value of true
const useRequest = <T = any>(
  route: string,
  useAuth: boolean = true
): UseRequestReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  //@ts-ignore
  const BASE_URL = import.meta.env.VITE_BASE_URL as string;

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const token = useSelector((state: RootState) => state.auth.token);
  const refreshToken = useSelector((state: RootState) => state.auth.refresh);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const location = useLocation();

  let isRefreshing = false;

  const refreshAccessToken = async (): Promise<string | null> => {
    if (isRefreshing) {
      console.warn("refreshAccessToken is already in progress");
      return null;
    }

    isRefreshing = true;
    try {
      const response = await fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      const result = await response.json();
      const isSuccess = result?.status === "success";

      if (isSuccess) {
        const newToken = result.data.access;
        const payload = {
          token: newToken,
          refresh: result.data.refresh,
        };

        dispatch(updateToken(payload)); // Update the Redux store

        return newToken; // Return the new token directly
      }
      if (result?.status === "failure") {
        toast("Session Expired", {
          description: "Please log in again.",
        });
        navigate("/login", { state: { from: location.pathname } });
      }

      throw new Error("No new token received");
    } catch (err) {
      console.error("Error refreshing token:", err);
      return null;
    }
  };

  const makeRequest = async (
    requestData: RequestData | null = null,
    method: string = "GET",
    contentType: string = "application/json",
    url_with_slug: string | null = null
  ): Promise<T | undefined> => {
    let url = url_with_slug || route;

    const makeFetch = async (
      authToken: string | null | undefined
    ): Promise<Response> => {
      setLoading(true);
      setError(null); // Reset error state before making the request
      const headers: Record<string, string> = {
        ...(contentType !== "multipart/form-data" && {
          "Content-Type": contentType,
        }),
      };

      if (useAuth && authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
      }
      // Append query parameters for GET requests
      if (method === "GET" && requestData) {
        const queryParams = new URLSearchParams(
          requestData as Record<string, string>
        ).toString();
        url += `?${queryParams}`;
      }
      const options: RequestInit = {
        method,
        headers,
      };

      if (method !== "GET" && requestData) {
        options.body =
          contentType === "application/json"
            ? JSON.stringify(requestData)
            : convertToFormData(requestData);
      }

      return fetch(`${BASE_URL}${url}`, options);
    };

    try {
      // Handle authentication if useAuth is true
      if (useAuth) {
        if (!isAuthenticated) {
          toast("Unauthorized access", {
            description: "Please log in to continue.",
          });
          navigate("/login", { state: { from: location.pathname } });
          throw new Error("User is not authenticated");
        }

        if (!token) {
          throw new Error("Token is not available");
        }
      }

      let response = await makeFetch(useAuth ? token : null);

      // Handle token refresh for authenticated requests
      if (useAuth && response.status === 401) {
        const newToken = await refreshAccessToken();

        if (newToken) {
          response = await makeFetch(newToken); // Retry after token refresh
        } else {
          throw new Error("Failed to refresh token");
        }
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result: any = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err as Error);
      throw err; // Re-throw the error to handle it in the calling component
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, makeRequest };
};

export default useRequest;
