import { history } from "helpers/history";
import { toastService } from "helpers/toast";
import { LoginRequest } from "models/user";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { UserFunction } from "redux/UserReducer/action";
import { authApi } from "services/api/auth";
import "./style.scss";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const [infoLogin, setInfoLogin] = useState<LoginRequest>({
    username: "",
    password: "",
  });
  const login = (envent: any) => {
    envent.preventDefault();
    authApi.login(infoLogin).then((res) => {
      if (res.status === 200) {
        dispatch(
          UserFunction.login({
            accessToken: res.data.token,
            userInfo: res.data.userInfo,
          })
        );
        history.push("/admin");
      } else {
        return toastService.error(res.data.message);
      }
    });
  };
  return (
    <div id="login-page">
      <div className="login-form">
        <Form onSubmit={login}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tên đăng nhập</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter email"
              onChange={(e) =>
                setInfoLogin({ ...infoLogin, username: e.target.value })
              }
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setInfoLogin({ ...infoLogin, password: e.target.value })
              }
            /> 
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
