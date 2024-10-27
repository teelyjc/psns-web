import { ChangeEvent, FormEvent, FunctionComponent } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";

type SignUpFormProps = {
  onSubmit: (e: FormEvent) => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const SignUpForm: FunctionComponent<SignUpFormProps> = ({
  onSubmit,
  onInputChange,
}) => {
  return (
    <Form onSubmit={onSubmit}>
      <h1 className="text-center mb-4">สมัครสมาชิกกับ Pet-System</h1>
      <FloatingLabel label="ชื่อผู้ใช้งาน" className="mb-3">
        <Form.Control type="text" name="username" onChange={onInputChange} />
      </FloatingLabel>
      <FloatingLabel label="รหัสผ่าน" className="mb-3">
        <Form.Control
          type="password"
          name="password"
          onChange={onInputChange}
        />
      </FloatingLabel>
      <FloatingLabel label="ยืนยันรหัสผ่าน" className="mb-3">
        <Form.Control
          type="password"
          name="confirmPassword"
          onChange={onInputChange}
        />
      </FloatingLabel>

      <Button variant="success" type="submit" className="w-100 py-2">
        สมัครสมาชิก
      </Button>
    </Form>
  );
};
