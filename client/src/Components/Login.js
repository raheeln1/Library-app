import {
  Container,
  Row,
  Col,
} from "reactstrap";

import { useEffect, useState } from "react";
import { loginSchemaValidation } from "../Validations/LoginValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Features/UsersSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { user, isLogin } = useSelector((state) => state.users);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchemaValidation),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = () => {
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
    navigate("/home");
  };

  useEffect(() => {
    if (isLogin) navigate("/home");
    else navigate("/login");
  }, [isLogin, user, navigate]);

  return (
    <div className="auth-wrapper">
      <Container>
        <Row className="justify-content-center">
          <Col lg="6">
            <form className="div-form" onSubmit={(onSubmit)}>
              <section>
                <p>Welcome to My Librarie Book</p>
                <p className="text-center fs-3">Login</p>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email..."
                    {...register("email", {
                      onChange: (e) => setemail(e.target.value),
                    })}
                  />
                  <p className="error">{errors.email?.message}</p>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password..."
                    {...register("password", {
                      onChange: (e) => setpassword(e.target.value),
                    })}
                  />
                  <p className="error">{errors.password?.message}</p>
                </div>
                <button type="submit" className="button">
                  Sign In
                </button>
              </section>
              <div className="mt-1">
                You don't have an account?{" "}
                <Link to="/register" onSubmit={handleSubmit}>Sign Up</Link>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
