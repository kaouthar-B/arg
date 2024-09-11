import logo from 'assets/img/brand/image.png'; // Import your logo image
// import pc from 'assets/img/brand/pc.png'; // Import PC image
// import tablette from 'assets/img/brand/tablette.png'; // Import tablet image

import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import routes from "routes.js";

const Auth = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.body.classList.add("bg-default");
    return () => {
      document.body.classList.remove("bg-default");
    };
  }, []);

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <header style={headerStyle}>
        <Container>
          <Row>
            <Col className="d-flex justify-content-center">
              <img src={logo} alt="GCAM" style={logoImageStyle} />
            </Col>
          </Row>
        </Container>
      </header>
      <div className="main-content d-flex" ref={mainContent} style={{ background: "#ffffff", minHeight: "100vh" }}>
        <div className="sidebar" style={{ background: "#00963A", minHeight: "100vh", width: "30vw", padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Container className="text-center">
            {/* Commenting out the image container to hide PC and tablet images */}
            {/* <div style={imageContainerStyle}>
              <img src={pc} alt="PC" style={pcImageStyle} />
              <img src={tablette} alt="Tablette" style={tabletImageStyle} />
            </div> */}
          </Container>
        </div>
        <div className="content" style={{ width: "70vw", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Container>
            <Row className="justify-content-center">
              <Routes>
                {getRoutes(routes)}
                <Route path="*" element={<Navigate to="/auth/login" replace />} />
              </Routes>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

// Styles
const headerStyle = {
  backgroundColor: 'white',
  padding: '10px 0',
  borderBottom: '1px solid #eaeaea',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const logoImageStyle = {
  height: '108px', // Adjusted height
  width: '120px'  // Adjusted width
};

const imageContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  marginTop: '5vh' // Adjust the top margin to move the images down
};

const tabletImageStyle = {
  width: '30vw', // Adjust the width as needed
  height: 'auto', // Maintain aspect ratio
  position: 'absolute',
  top: '2vh', // Lower the tablet image
  left: '12vw', // Move the tablet image to the right of the PC image
  zIndex: 1 // Ensure it is on the correct layer
};

const pcImageStyle = {
  width: '30vw', // Adjust the width as needed
  height: 'auto', // Maintain aspect ratio
  zIndex: 2, // Ensure it is on the correct layer
  position: 'relative' // Ensure it remains in the document flow
};

export default Auth;
