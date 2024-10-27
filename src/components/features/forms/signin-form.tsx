import { ChangeEvent, FormEvent, Fragment, FunctionComponent } from "react";
import { Button, FloatingLabel } from "react-bootstrap";
import { Form } from "react-bootstrap";

type SignInFormProps = {
  data: { username: string; password: string };
  onSubmit: (e: FormEvent) => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const SignInForm: FunctionComponent<SignInFormProps> = ({
  data,
  onSubmit,
  onInputChange,
}) => {
  return (
    <Fragment>
      <Form onSubmit={onSubmit}>
        <h1 className="text-center mb-4">เข้าสู่ระบบ Pet-System</h1>
        <Form.Group className="mb-3">
          <FloatingLabel label="ชื่อผู้ใช้งาน" className="mb-3">
            <Form.Control
              type="text"
              name="username"
              onChange={onInputChange}
              value={data.username}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel label="รหัสผ่าน" className="mb-3">
            <Form.Control
              type="password"
              name="password"
              onChange={onInputChange}
              value={data.password}
            />
          </FloatingLabel>
        </Form.Group>

        <Button variant="success" className="w-100 py-2" type="submit">
          เข้าสู่ระบบ
        </Button>
      </Form>
    </Fragment>
  );
};
