import { useParams } from "react-router-dom";

const DynamicRoute = () => {
  const { id } = useParams();

  return <div>DynamicRoute id is {id}</div>;
};

export default DynamicRoute;
