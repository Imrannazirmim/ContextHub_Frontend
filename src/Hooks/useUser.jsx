import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useUser = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure()

  const { data: userData, isLoading, refetch } = useQuery({
    queryKey: ['user', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    }
  });

  return { userData, isLoading: loading || isLoading, refetch };
};

export default useUser;