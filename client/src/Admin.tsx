import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const Admin = () => {
  const [magicNumber, setMagicNumber] = useState("");
  return (
    <>
      <div className="w-full h-[100vh] bg-yellow-50 flex content-center items-center">
        <div className="border-4 h-[100vh] w-[20%] bg-green-100 text-center pt-2">
          <NavLink to="/admin/dashboard" className="text-blue-900 me-4">
            Dashboard
          </NavLink>
          <NavLink to="/admin/users" className="text-blue-900">
            Users
          </NavLink>
          <input
            type="text"
            name="magicNumber"
            id=""
            placeholder="Add a dynamic route Number"
            value={magicNumber}
            onChange={(e) => {
              setMagicNumber(e.target.value);
            }}
            className={`ms-4 me-4`}
          />
          <NavLink
            to={`/admin/dynamicRoute/${magicNumber}`}
            className={`text-blue-900 ${
              !magicNumber ? `cursor-not-allowed` : ""
            }`}
          >
            Dynamic route
          </NavLink>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Admin;
