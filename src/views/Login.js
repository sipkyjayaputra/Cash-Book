import React, { useCallback, useContext } from "react";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import facebookIcon from "../image/facebook.png";
import googleIcon from "../image/google.png";
import { Link, withRouter } from "react-router-dom";
import { app, googleProvider, facebookProvider } from "../firebase";
import { AuthContext } from "../Auth";
import { Redirect } from "react-router";

function Login({ history }) {
  const [visiblePassword, setVisiblePassword] = React.useState(false);

  const hanldeLogin = useCallback(
    (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        app.auth().signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const googleLogin = useCallback(
    (event) => {
      event.preventDefault();
      try {
        app.auth().signInWithPopup(googleProvider);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const facebookLogin = useCallback(
    (event) => {
      event.preventDefault();
      try {
        app.auth().signInWithPopup(facebookProvider);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundImage: "linear-gradient(to bottom right, #5089C6, #035397)",
      }}
      className="d-flex align-items-center flex-column justify-content-center"
    >
      <div className="container my-auto text-center">
        <h1 className="text-white">Cash Book</h1>
        <p className="text-white mb-5">
          <i>"Enables you to track your cash flow"</i>
        </p>
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-xs-12 col-sm-10 col-md-8 col-lg-6">
            <div className="card">
              <div className="card-body text-left pb-4 px-md-5 pt-5">
                <h2 style={{ fontWeight: 200 }} className="mb-4">
                  Login Page
                </h2>
                <form onSubmit={hanldeLogin}>
                  <label style={{ fontSize: 14 }} htmlFor="exampleInputEmail1">
                    Email address
                  </label>
                  <div
                    className="d-flex align-items-center border px-3 py-1 shadow mb-3"
                    style={{ borderRadius: 20 }}
                  >
                    <EmailIcon style={{ color: "#5089C6" }} />
                    <input
                      type="email"
                      className="ml-2"
                      name="email"
                      placeholder="Enter email"
                      style={{
                        border: "none",
                        outline: "none",
                        fontSize: 12,
                        color: "grey",
                      }}
                      required
                    />
                  </div>
                  <label style={{ fontSize: 14 }} htmlFor="exampleInputEmail1">
                    Password
                  </label>
                  <div
                    className="d-flex align-items-center justify-content-between border px-3 py-1 shadow mb-3"
                    style={{ borderRadius: 20 }}
                  >
                    <div className="d-flex align-items-center">
                      <LockIcon style={{ color: "#5089C6" }} />
                      <input
                        type={visiblePassword ? "text" : "password"}
                        className="ml-2"
                        name="password"
                        placeholder="Enter password"
                        style={{
                          border: "none",
                          outline: "none",
                          fontSize: 12,
                          color: "grey",
                        }}
                        required
                      />
                    </div>
                    {visiblePassword ? (
                      <VisibilityOffIcon
                        style={{ color: "#5089C6" }}
                        onClick={() => setVisiblePassword(!visiblePassword)}
                      />
                    ) : (
                      <VisibilityIcon
                        style={{ color: "#5089C6" }}
                        onClick={() => setVisiblePassword(!visiblePassword)}
                      />
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn w-100 py-2 text-white"
                    style={{
                      borderRadius: 20,
                      fontSize: 12,
                      backgroundColor: "#5089C6",
                    }}
                  >
                    Submit
                  </button>
                </form>

                <div className="py-4 d-flex flex-column">
                  <div className="text-center">
                    <span>Social Media Login</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-center mt-2">
                    <img
                      src={facebookIcon}
                      alt="Facebook login"
                      width={30}
                      className="mx-1 clickable"
                      onClick={facebookLogin}
                    />
                    <img
                      src={googleIcon}
                      alt="Google login"
                      width={30}
                      className="mx-1 clickable"
                      onClick={googleLogin}
                    />
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-end mt-4">
                  <span style={{ fontSize: 12 }}>
                    Not registered yet ? <Link to="/register">register</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);
