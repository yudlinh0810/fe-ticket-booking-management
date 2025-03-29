import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

// custom useQuery
export const useCustomQuery = <T>(queryKey: string[], queryFn: () => Promise<T>, options = {}) => {
  return useQuery({
    queryKey,
    queryFn,
    ...options, // cho phép truyền thêm options
  });
};

export const useCustomMutation = <T, R>(
  mutationFn: (data: T) => Promise<R>,
  nav?: string,
  options = {}
) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<R, Error, T>({
    mutationFn,
    ...options,
    onSuccess: () => {
      queryClient.invalidateQueries(); // Làm mới dữ liệu sau khi mutation thành công
      if (nav) navigate(nav);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });
};
