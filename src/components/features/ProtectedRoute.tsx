import { Fragment, FunctionComponent, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useCurrentUserQuery } from "@/hooks/AuthHooks";
import { Routes as RouteConstants } from "@/libs/constants";

type ProtectedProps = {
  children: ReactNode;
};

const ProtectedRoute: FunctionComponent<ProtectedProps> = ({ children }) => {
  const navigate = useNavigate();

  const { isLoading: isUserLoading, isError: isUserError } =
    useCurrentUserQuery();

  useEffect(() => {
    if (isUserError) {
      navigate(RouteConstants.SignIn, { replace: true });
    }
  }, [isUserError, isUserLoading, navigate]);

  if (isUserLoading) {
    return (
      <Fragment>
        <p>Loading..</p>
      </Fragment>
    );
  }

  return <Fragment>{children}</Fragment>;
};

export default ProtectedRoute;
