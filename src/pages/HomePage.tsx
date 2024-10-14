import type { FunctionComponent } from "react";
import { Fragment } from "react";
import { Container } from "react-bootstrap";

import Navbar from "@/components/common/Navbar";

const HomePage: FunctionComponent = () => {
  return (
    <Fragment>
      <Navbar />
      <Container className="mt-5">
        <h1>ยินดีต้อนรับสู่ Pet-System</h1>
      </Container>
    </Fragment>
  );
};

export default HomePage;
