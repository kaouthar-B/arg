import Sidebar from "components/Sidebar/Sidebar.js";
import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import routes from "routes.js";
import logo from 'assets/img/brand/image.png';

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  const isHomePage = location.pathname === "/admin/HomePage";

  return (
    <>
      {!isHomePage && (
        <Sidebar
          {...props}
          routes={routes}
          logo={{
            innerLink: "/admin/index",
            imgSrc: require("../assets/img/brand/image.png"), // Use your updated logo here
            imgAlt: "Banque Populaire",
          }} 
          logoStyle={{
            width: "150px", // Adjust the width as needed
            height: "500px",
          }}
        />
      )}
      <div className="main-content" ref={mainContent}>
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/admin/HomePage" replace />} />
        </Routes>
      </div>
    </>
  );
};

export default Admin;
