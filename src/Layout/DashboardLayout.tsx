
import Sidebar from "@/features/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";



const DashboardLayout = () => {


  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
