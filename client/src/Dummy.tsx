import useGetUsers from "./hooks/useGetUsers";

export default function Dummy() {
  const { data, error, isLoading } = useGetUsers();

  if (error)
    return (
      <>
        <h2>Error...</h2>
      </>
    );
  if (isLoading)
    return (
      <>
        <h2>loading...</h2>
      </>
    );
  return (
    <>
      {console.log(data ? data : "data", "data")}
      <h2>users</h2>
      {data &&
        data.map((item: { id: number; name: string }, i: number) => (
          <p className="text-4xl font-bold underline" key={i}>
            {item.id} : {item.name}
          </p>
        ))}
    </>
  );
}
