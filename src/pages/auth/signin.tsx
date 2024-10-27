import {
  ChangeEvent,
  FormEvent,
  Fragment,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Navbar from "@/components/common/navbar-nav";
import { SignInForm } from "@/components/features/forms/signin-form";
import { useCurrentUserQuery, useSignInMutation } from "@/hooks/auth-hooks";
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

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    signin({ username: data.username, password: data.password });
  };

  return (
    <Fragment>
      <Navbar />
      <Container className="border p-5 shadow mt-5 w-50">
        <SignInForm
          data={data}
          onSubmit={handleSubmit}
          onInputChange={handleInputChange}
        />
      </Container>
    </Fragment>
  );
};

export default SignInPage;
