// @ts-nocheck
import { useContext } from "react";
import { userContext } from "./context/userContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(userContext);
  if (!user.name && !user.email) return <>{navigate("/")} </>;
  else {
    return (
      <>
        {console.log(user, "user")}
        <h3>{user?.name} is logged in</h3>
      </>
    );
  }
};

export default Dashboard;
