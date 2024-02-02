import { Outlet } from "react-router-dom";
import scss from "./Laypot.module.scss"

const Layout = () => {
  return (
    <>
      
      <div>
        <main>
          <Outlet />
        </main>
        
      </div>
    </>
  );
};

export default Layout;
