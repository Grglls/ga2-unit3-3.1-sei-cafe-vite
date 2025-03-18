import { useState } from "react";
import * as usersService from "../../utilities/users-service";

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  function handleChange(event) {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
    setError('');
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      // The promise returned by the login service method
      // will resolve to the user object included in the
      // payload of the JSON web token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError('Log In failed - try again.');
    }
  };

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" name="email" value={credentials.email} onChange={handleChange} required />
          <label>Password</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
          <button type="submit">Log In</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}