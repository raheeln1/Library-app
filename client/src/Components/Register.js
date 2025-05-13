import {
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useState } from "react";

import { userSchemaValidation } from "../Validations/UserValidations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { registerUser } from "../Features/UsersSlice.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
 
  //Create the state variables
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  //For form validation using react-hook-form
  const {
    register,
    handleSubmit, 
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation), 
  });

  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 

  // Handle form submission
  const onSubmit = (data) => {
    const userData= {name:name, email:email, password:password}
    dispatch(registerUser(userData))
    navigate("/login")

  
  };

 

  return (
    <div className="auth-wrapper">
      <Container>
        <Row className="justify-content-center">
          <Col lg="6">
            <form className="div-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="appTitle"></div>
              <section className="form">
                <p className="text-center fs-3">Register</p>
  
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your name..."
                    {...register("name", {
                      onChange: (e) => setname(e.target.value),
                    })}
                  />
                  <p className="error">{errors.name?.message}</p>
                </div>
  
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
  
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm your password..."
                    {...register("confirmPassword", {
                      onChange: (e) => setconfirmPassword(e.target.value),
                    })}
                  />
                  <p className="error">{errors.confirmPassword?.message}</p>
                </div>
  
                <Button className="button">Register</Button>
              </section>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default Register;
