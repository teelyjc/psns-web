import { Fragment, FunctionComponent, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useCurrentUserQuery } from "@/hooks/auth-hooks";
import { Routes as RouteConstants } from "@/libs/constants";

type ProtectedProps = {
  children: ReactNode;
};

export const ProtectedRoute: FunctionComponent<ProtectedProps> = ({
  children,
}) => {
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
