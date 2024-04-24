import { useQuery } from '@tanstack/react-query';

const useUserData = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/users');
      const data = await res.json();
      return data;
    },
  });
  return { data, isLoading, refetch };
};

export default useUserData;
