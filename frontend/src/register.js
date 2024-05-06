import React, { useState,} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const RegData = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [lastfmUser, setLFMU] = useState('')

  
  const navigate = useNavigate()

  const submitLogin = (e) => {
    e.preventDefault()

    if ('' === email) {
      setEmailError('Please input an email')
      return
    }
    if (!/^[\w-\.]+@([\w-]+.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email')
      return
    }

    if ('' === password) {
      setPasswordError('Please input a password')
      return
    }

    if (password.length < 7) {
      setPasswordError('The password must be 8 characters or longer')
      return
    }
    const reg = {
      email: email,
      password: password,
      username: username,
      lastfmUser: lastfmUser,
    }

  const register = new reg()
  register.append('register', JSON.stringify(reg))
  //send json of loginInfo to the backends
  sendtoDB((RegData) => {
    // if the data successfully is sent to the backend (BE and DB), login
    if (register) console.log(register);
    else if ( window.confirm('An account with the email address ' + email + ' does not exist. Please sign up for a new account',)
    ) {
      
      }
    })
    
  };
  const sendtoDB = (callback) => {
      fetch("http://localhost:3000/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
      },
      body:callback,
      })
    .then((r) => r.json())
    .then((newAccount) => {
      setEmail("");
      setPassword("");
      setLFMU('');
      setUsername('');
      
    })
    navigate("/home")
  }




  return (
    <div>
      <div className='mainContainer'>
        <h1>Register</h1>
        <div className='noAccount'>
          already have an account? login <a href='./login.js'>here</a>!
        </div>
        <div className='form'>
          <form onSubmit={submitLogin}>
            <div className='inputContainer'>
              <label htmlFor='email'>Email:</label>
              <input value={email} placeholder="Enter your email here" onChange={(ev) => setEmail(ev.target.value)} className={'inputBox'}/>
              <label className="errorLabel">{emailError}</label>
            </div>
            <br />
            <div className={'inputContainer'}>
              <label  htmlFor='password'>Password:</label>
              <input value={password} placeholder="Enter your password here" onChange={(ev) => setPassword(ev.target.value)} className={'inputBox'}/>
             <label className="errorLabel">{passwordError}</label>
            </div>
            <br>
            </br>
            <div className='inputContainer'>
              <label htmlFor='username'>Username:</label>
              <input value={username} placeholder="Enter your username here" onChange={(ev) => setUsername(ev.target.value)} className={'inputBox'}/>

            </div>
            <br />
            <div className={'inputContainer'}>
              <label  htmlFor='lastfmuser'>last.fm Username:</label>
              <input value={lastfmUser} placeholder="Enter your last.fm username here" onChange={(ev) => setLFMU(ev.target.value)} className={'inputBox'}/>

            </div>
            <button className='inputButton'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
};

export default RegData