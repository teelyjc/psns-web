import { FunctionComponent } from "react";
import {
  Button,
  Container,
  Nav,
  Navbar as BootstrapNavbar,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { useCurrentUserQuery, useSignOutMutation } from "@/hooks/auth-hooks";
import { Routes as RouteConstants } from "@/libs/constants";

const Navbar: FunctionComponent = () => {
  const { data: user } = useCurrentUserQuery();
  const { mutate: signout } = useSignOutMutation();

  return (
    <BootstrapNavbar expand="lg" className="bg-body-tertiary">
      <Container>
        <BootstrapNavbar.Brand as={Link} to={RouteConstants.Home}>
          Pet-System
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />
        <BootstrapNavbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={RouteConstants.Home}>
              หน้าแรก
            </Nav.Link>
          </Nav>
          {!user ? (
            <Nav>
              <Nav.Link as={Link} to={RouteConstants.SignUp}>
                สมัครสมาชิก
              </Nav.Link>
              <Nav.Link as={Link} to={RouteConstants.SignIn}>
                เข้าสู่ระบบ
              </Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <NavDropdown title="ตั้งค่า" id="collapsible-nav-dropdown">
                <NavDropdown.Item as={Link} to={RouteConstants.Preferences}>
                  ตั้งค่าผู้ใช้งาน
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to={RouteConstants.Users}>
                  ผู้ใช้งานทั้งหมด
                </NavDropdown.Item>
              </NavDropdown>
              <Button variant="danger" onClick={() => signout()}>
                ออกจากระบบ
              </Button>
            </Nav>
          )}
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
