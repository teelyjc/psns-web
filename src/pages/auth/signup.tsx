import {
  ChangeEvent,
  FormEvent,
  Fragment,
  FunctionComponent,
  useState,
} from "react";
import {
  Button,
  Container,
  FloatingLabel,
  Form,
  Toast,
  ToastContainer,
} from "react-bootstrap";

import Navbar from "@/components/common/Navbar";
import { ApiRoutes as ApiRouteConstants } from "@/libs/constants";
import Fetcher from "@/libs/fetcher";

const SignUpPage: FunctionComponent = () => {
  const [userSignUpData, setUserSignUpData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [isShowing, setIsShowing] = useState(false);

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    Fetcher.post(ApiRouteConstants.SignUp, { ...userSignUpData })
      .then(() => {
        setIsShowing(true);
      })
      .catch(() => {});
  };

  const handleChangeUserSignUpData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUserSignUpData({ ...userSignUpData, [name]: value });
  };
  return (
    <Fragment>
      <Navbar />
      <Container className="border p-5 shadow mt-5 w-50">
        <Form onSubmit={onFormSubmit}>
          <h1 className="text-center mb-4">สมัครสมาชิกกับ Pet-System</h1>
          <FloatingLabel label="ชื่อผู้ใช้งาน" className="mb-3">
            <Form.Control
              type="text"
              name="username"
              onChange={handleChangeUserSignUpData}
            />
          </FloatingLabel>
          <FloatingLabel label="รหัสผ่าน" className="mb-3">
            <Form.Control
              type="password"
              name="password"
              onChange={handleChangeUserSignUpData}
            />
          </FloatingLabel>
          <FloatingLabel label="ยืนยันรหัสผ่าน" className="mb-3">
            <Form.Control
              type="password"
              name="confirmPassword"
              onChange={handleChangeUserSignUpData}
            />
          </FloatingLabel>

          <ToastContainer
            className="p-3"
            position="top-end"
            style={{ zIndex: 1 }}
          >
            <Toast
              bg="success"
              className="d-inline-block m-1"
              autohide
              delay={5000}
              show={isShowing}
            >
              <Toast.Header>สมัครสมาชิกสำเร็จ</Toast.Header>
              <Toast.Body className="text-white">
                ยินดีต้อนรับเข้าสู่ PetSystem
              </Toast.Body>
            </Toast>
          </ToastContainer>

          <Button variant="success" type="submit" className="w-100 py-2">
            สมัครสมาชิก
          </Button>
        </Form>
      </Container>
    </Fragment>
  );
};

export default SignUpPage;
