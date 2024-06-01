import { NavLink, Outlet } from "react-router-dom"

const Admin = () => {
  return (
    <>
    <div className="">
              <NavLink to="/admin/dashboard">Dashboard</NavLink>
              <NavLink to="/admin/users">Users</NavLink>
            </div>
    <div>
        <Outlet/>
    </div>
    </>
  )
}

export default Admin