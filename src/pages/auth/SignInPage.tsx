import {
  ChangeEvent,
  FormEvent,
  Fragment,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Navbar from "@/components/common/Navbar";
import { useCurrentUserQuery, useSignInMutation } from "@/hooks/AuthHooks";
import { Routes as RouteConstants } from "@/libs/constants";

const SignInPage: FunctionComponent = () => {
  const navigate = useNavigate();

  const { mutate: signin, isSuccess: isSignInSuccess } = useSignInMutation();
  const { data: user } = useCurrentUserQuery();

  useEffect(() => {
    if (user || isSignInSuccess) {
      navigate(RouteConstants.Preferences, { replace: true });
    }
  }, [user, navigate, isSignInSuccess]);

  const [userLoginData, setUserLoginData] = useState({
    username: "",
    password: "",
  });

  const handleChangeUserLoginData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUserLoginData({ ...userLoginData, [name]: value });
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    signin({
      username: userLoginData.username,
      password: userLoginData.password,
    });
  };

  return (
    <Fragment>
      <Navbar />
      <Container className="border p-5 shadow mt-5 w-50">
        <Form onSubmit={handleFormSubmit}>
          <h1 className="text-center mb-4">เข้าสู่ระบบ Pet-System</h1>
          <Form.Group className="mb-3">
            <FloatingLabel label="ชื่อผู้ใช้งาน" className="mb-3">
              <Form.Control
                type="text"
                name="username"
                onChange={handleChangeUserLoginData}
                value={userLoginData.username}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3">
            <FloatingLabel label="รหัสผ่าน" className="mb-3">
              <Form.Control
                type="password"
                name="password"
                onChange={handleChangeUserLoginData}
                value={userLoginData.password}
              />
            </FloatingLabel>
          </Form.Group>

          <Button variant="success" className="w-100 py-2" type="submit">
            เข้าสู่ระบบ
          </Button>
        </Form>
      </Container>
    </Fragment>
  );
};

export default SignInPage;
