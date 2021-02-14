import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { signInUser } from "../../Services/auth.js"
import "./SignUp.scss"

class SignIn extends Component {
    constructor(props) {
        super()

        this.state = {
            username: '',
            password: '',
            isError: false,
            errorMsg: ''
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
            isError: false,
            errorMsg: ''
        })
    }

    onSignIn = event => {
        event.preventDefault()

        const { history, setUser } = this.props

        signInUser(this.state)
            .then(res => setUser(res.user))
            .then(() => history.push('/'))
            .catch(error => {
                console.error(error)
                this.setState({
                    isError: true,
                    errorMsg: 'Invalid Credentials',
                    username: '',
                    password: ''
                })
            })
    }

    renderError = () => {
        const toggleForm = this.state.isError ? 'danger' : ''
        if (this.state.isError) {
            return (
                <button type="submit" className={toggleForm}>
                    {this.state.errorMsg}
                </button>
            )
        } else {
            return <button type="submit">Sign In</button>
        }
    }

    render() {
        const { username, password } = this.state

        

       this.props.user && this.props.history.push('/')


        return (
           
                <div className="signup">
                    <form className='signup-form' onSubmit={this.onSignIn}>
                    <Link to='/signup'><h6>sign up here</h6></Link>
                        <div>
                        <label>Username</label>
                        <input
                            required
                            type="text"
                            name="username"
                            value={username}
                            placeholder="Enter Username"
                            onChange={this.handleChange}
                        />
                        <label>Password</label>
                        <input
                            required
                            name="password"
                            value={password}
                            type="password"
                            placeholder="Password"
                            onChange={this.handleChange}
                        /></div>
                        {this.renderError()}
                    </form>
                </div>
          
        )
    }
}

export default withRouter(SignIn)