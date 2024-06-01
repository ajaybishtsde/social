import { useQuery } from "@tanstack/react-query";

const useGetUsers = () => {
  const getUsers = () => {
    return fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => res.json())
      .then((d) => d);
  };
  return useQuery({
    queryKey: ["fetchingSomeData"],
    queryFn: getUsers,
    staleTime: Infinity,
  });
};

export default useGetUsers;
