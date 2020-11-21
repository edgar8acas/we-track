import React, { SyntheticEvent, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { LocationState } from "../typings";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    stayLoggedIn: "false",
  });

  const auth = useAuth();
  const history = useHistory();
  const location = useLocation<LocationState>();

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const { from } = location.state || { from: { pathname: "/dashboard" } };
    auth?.signIn(user).then(() => {
      history.replace(from.pathname);
    });
  }

  // TODO: type the event
  function handleChange(event: any) {
    event.persist();
    const { name, checked, value } = event.target;
    const newValue = name === "stayLoggedIn" ? checked : value;
    setUser((old) => ({ ...old, [name]: newValue }));
  }

  return (
    <div className="Login">
      <div className="Login-wrapper center-form">
        <header>
          <h1>Sign in to We Track</h1>
        </header>
        <form className="Login-form" onSubmit={handleSubmit}>
          <div className="control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <div className="Login-form__actions">
            <div className="control">
              <input
                type="checkbox"
                id="stay-logged-in"
                name="stayLoggedIn"
                value={String(user.stayLoggedIn)}
                onChange={handleChange}
              />
              <label htmlFor="stay-logged-in">Remember me</label>
            </div>
            <button className="button" type="submit">
              Sign in
            </button>
          </div>
        </form>
        <div className="Login__register-actions">
          <p>Don't have an account?</p>
          <button className="button" onClick={() => history.replace("/signup")}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
