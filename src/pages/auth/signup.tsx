import {
  ChangeEvent,
  FormEvent,
  Fragment,
  FunctionComponent,
  useState,
} from "react";
import { Container } from "react-bootstrap";

import Navbar from "@/components/common/navbar-nav";
import { SignUpForm } from "@/components/features/forms/signup-form";
import { useSignUpMutation } from "@/hooks/users-hooks";

const SignUpPage: FunctionComponent = () => {
  const [userSignUpData, setUserSignUpData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { mutate: signup } = useSignUpMutation();

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    signup({ ...userSignUpData });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUserSignUpData({ ...userSignUpData, [name]: value });
  };

  return (
    <Fragment>
      <Navbar />
      <Container className="border p-5 shadow mt-5 w-50">
        <SignUpForm onInputChange={handleInputChange} onSubmit={onFormSubmit} />
      </Container>
    </Fragment>
  );
};

export default SignUpPage;
