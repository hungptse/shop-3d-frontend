import React, { Component } from "react";
import { post } from "../../utils/ApiCaller";
import { AUTH__LOGIN } from "../../utils/ApiEndpoint";
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "../../utils/LocalStorage";


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentId: "",
      password: ""
    };
  }

  componentDidMount() {
    if (LocalStorageUtils.isRole() === "isAdmin") {
      this.props.history.push("/admin");
    } else if (LocalStorageUtils.isRole() === "isUser") {
      this.props.history.push("/user");
    } else {
      this.props.history.push("/");
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.onLogin(values.studentId, values.password, token => {
          if (token) {
            LocalStorageUtils.setItem(LOCAL_STORAGE_KEY.JWT, token);
            if (LocalStorageUtils.isRole() === "isAdmin") {
              this.props.history.push("/admin");
            } else if (LocalStorageUtils.isRole() === "isUser") {
              this.props.history.push("/user");
            }
          }
        });
      }
    });
  };

  onLogin(studentId, password, cb) {
    post(
      AUTH__LOGIN,
      {},
      {
        studentId,
        password
      },
      { "Content-Type": "application/x-www-form-urlencoded" }
    )
      .then(res => {
        cb(res.headers.authorization.replace("Bearer  ", ""));
      })
      .catch(() => {
        // message.error("Invalid Student ID or Password");
      });
  }


  render() {

    return (
      <div className="content-container">
        Login
      </div>
    );
  }
}

export default LoginForm;
