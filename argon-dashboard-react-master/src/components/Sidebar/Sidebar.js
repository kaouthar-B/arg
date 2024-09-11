import { PropTypes } from "prop-types";
import { useState } from "react";
import { Link, NavLink as NavLinkRRD } from "react-router-dom";
import {
  Col,
  Collapse,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  Row,
  UncontrolledDropdown
} from "reactstrap";

const Sidebar = ({ routes, logo, userType }) => {
  const [collapseOpen, setCollapseOpen] = useState(false);

  const toggleCollapse = () => {
    setCollapseOpen(data => !data);
  };

  const closeCollapse = () => {
    setCollapseOpen(false);
  };

  const createLinks = (routes) => {
        return routes
          /*.filter(route =>
            route.name !== "User Profile" &&
            route.name !== "HomePage" &&
            route.name !== "Login" &&
            route.name !== "Register" &&
            route.name !== "UpdateUtilisateurForm" &&
            route.name !== "AjouterCoursForm" &&
            route.name !== "AjoutDevisesForm" &&
            route.name !== "UpdateCoursForm" &&
            route.name !== "UpdateDeviseForm" &&
            route.name !== "DetailCours" &&
            (userType === "admin" ? route.name !== "Accueil" : route.name !== "Accueil2") &&
            (userType === "admin" || route.name !== "Liste des utilisateurs")
          ) // Exclude specified routes and filter based on userType  */
          .map((prop, key) => (
            <NavItem key={key}>
              <NavLink
                to={prop.layout + prop.path}
                tag={NavLinkRRD}
                onClick={closeCollapse}
                className="nav-link-icon"
                activeClassName="active"
              >
                <i className={prop.icon} />
                {prop.name}
              </NavLink>
            </NavItem>
          ));
      };

  let navbarBrandProps = {};
  if (logo && logo.innerLink) {
    navbarBrandProps = { to: logo.innerLink, tag: Link };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = { href: logo.outterLink, target: "_blank" };
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        <button className="navbar-toggler" type="button" onClick={toggleCollapse}>
          <span className="navbar-toggler-icon" />
        </button>
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <img alt={logo.imgAlt} className="navbar-brand-img" src={logo.imgSrc} />
          </NavbarBrand>
        ) : null}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav className="nav-link-icon">
              <i className="ni ni-bell-55" />
            </DropdownToggle>
            <DropdownMenu aria-labelledby="navbar-default_dropdown_1" className="dropdown-menu-arrow" right>
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <Collapse navbar isOpen={collapseOpen}>
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo && (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}><img alt={logo.imgAlt} src={logo.imgSrc} /></Link>
                  ) : (
                    <a href={logo.outterLink}><img alt={logo.imgAlt} src={logo.imgSrc} /></a>
                  )}
                </Col>
              )}
              <Col className="collapse-close" xs="6">
                <button className="navbar-toggler" type="button" onClick={toggleCollapse}>
                  <span /><span />
                </button>
              </Col>
            </Row>
          </div>
          <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input aria-label="Search" className="form-control-rounded form-control-prepended" placeholder="Search" type="search" />
              <InputGroupAddon addonType="prepend">
                <InputGroupText><span className="fa fa-search" /></InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form>
          <Nav navbar>
            {userType === "admin" && (
              <NavItem>
                <NavLink
                  to="/admin/accueil"
                  tag={NavLinkRRD}
                  onClick={closeCollapse}
                  className="nav-link-icon"
                  activeClassName="active"
                >
                  <i className="ni ni-tv-2" />
                  Accueil
                </NavLink>
              </NavItem>
            )}
            {(userType === "FrontOffice" || userType === "MiddleOffice") && (
              <NavItem>
                <NavLink
                  to="/admin/accueil2"
                  tag={NavLinkRRD}
                  onClick={closeCollapse}
                  className="nav-link-icon"
                  activeClassName="active"
                >
                  <i className="ni ni-tv-2" />
                  Accueil2
                </NavLink>
              </NavItem>
            )}
            {createLinks(routes)}
          </Nav>
          <hr className="my-3" />
        </Collapse>
      </Container>
      <style jsx>{`
        .navbar-vertical {
          background-color: #f8f9fa;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .navbar-vertical .nav-link-icon {
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          color: #f57c00;
          border-radius: 0.375rem;
          transition: all 0.3s;
        }

        .navbar-vertical .nav-link-icon i {
          margin-right: 0.5rem;
          font-size: 1.25rem;
          color: #f57c00;
        }

        .navbar-vertical .nav-link-icon:hover,
        .navbar-vertical .nav-link-icon.active {
          background-color: #00963A;
          color: #fff;
        }

        .navbar-vertical .nav-link-icon:hover i,
        .navbar-vertical .nav-link-icon.active i {
          color: #fff;
        }

        /* Set the logo size to 120x108 pixels */
        .navbar-vertical .navbar-brand-img {
          height: 108px; /* Set the height of the logo */
          width: 120px; /* Set the width of the logo */
          max-height: 108px; /* Ensure the logo does not exceed the specified height */
          max-width: 120px; /* Ensure the logo does not exceed the specified width */
        }

        .navbar-vertical .navbar-toggler {
          color: #f57c00;
        }

        .navbar-vertical .form-control-prepended {
          border-radius: 2rem;
        }

        .navbar-vertical .input-group-text {
          border-radius: 2rem;
        }

        .navbar-vertical .dropdown-menu-arrow::before {
          border-color: transparent transparent #f8f9fa transparent;
        }

        .navbar-vertical .dropdown-menu-arrow::after {
          border-color: transparent transparent #fff transparent;
        }
      `}</style>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    innerLink: PropTypes.string,
    outterLink: PropTypes.string,
    imgSrc: PropTypes.string.isRequired,
    imgAlt: PropTypes.string.isRequired,
  }),
  userType: PropTypes.string.isRequired, // Add this line to define the new prop type
};

export default Sidebar;
