// Build this component as a Class to show the difference (may encounter this in the wild)
// However, React is moving towards the newer function based components these days.
import { Component } from "react";
import { signUp } from "../../utilities/users-service";

export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      error: ''
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // We don't want to send 'error' or 'confirm' properties,
      // so make a copy of the state object and delete them:
      const formData = {...this.state};
      delete formData.confirm;
      delete formData.error;

      const user = await signUp(formData);
      console.log(user);
    } catch {
      this.setState({ error: 'Sign-up failed - try again.' });
    }
  };
  
  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div>
        <div className="form-container">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
            <label>Email</label>
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
            <label>Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            <label>Confirm</label>
            <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
            <button type="submit" disabled={disable}>SIGN UP</button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }  
}