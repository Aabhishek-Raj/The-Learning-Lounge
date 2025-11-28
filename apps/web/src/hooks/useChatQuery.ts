import { useInfiniteQuery } from "@tanstack/react-query";

// import { useSocket } from '@/components/providers/socket-provider'
import { authFetch } from "@/lib/auth";

interface ChatQueryProps {
  queryKey: string;
  apiUrl: string;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
}

export const useChatQuery = ({
  queryKey,
  apiUrl,
  paramKey,
  paramValue,
}: ChatQueryProps) => {
  //   const { isConnected } = useSocket()
  const isConnected = true;

  const fetchMessages = async ({
    pageParam,
  }: {
    pageParam: string | undefined;
  }) => {
    const url = pageParam
      ? `${apiUrl}/?cursor=${pageParam}&${paramKey}=${paramValue}`
      : `${apiUrl}/?${paramKey}=${paramValue}`;

    const res = await authFetch(url, {
      method: "GET",
    });

    if (!res.ok) {
      // OPTIONALLY: extract server error
      const errBody = await res.text().catch(() => "Unknown error");
      throw new Error(`Failed: ${errBody}`);
    }

    const data = await res.json();
    return data; 
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: [queryKey],
      initialPageParam: undefined,
      queryFn: fetchMessages,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      refetchInterval: isConnected ? false : 10000,
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};
