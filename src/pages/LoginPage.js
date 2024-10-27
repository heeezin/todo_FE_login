import React, { useState } from "react";
import Form from "react-bootstrap/Form";

import { Link, Navigate, useNavigate } from "react-router-dom";
import api from "../utils/api";

const LoginPage = ({user,setUser}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해 주세요.');
      return; 
    }
    setLoading(true)
    try {
      const res = await api.post('/user/login', { email, password })
      
      if (res.status === 200) {
        setUser(res.data.user)
        sessionStorage.setItem("token",res.data.token)
        api.defaults.headers["authorization"] = "Bearer "+res.data.token
        setError('')
        navigate('/')
      }
      throw new Error(res.data.message)
    } catch (error) {
      setError(error.message)
    }
  }
  if(user) {
    return <Navigate to='/' />
  }
  return (
    <div className="display-center">
      <Form className="login-box" onSubmit={handleLogin}>
        <h1>로그인</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <div className="error-box">
          {error && <div>{error}</div>}
        </div>
        <div className="button-box">
          <button type="submit" className="button-primary" disabled={loading}>
            {loading ? 'Logging in..': 'Login'}
          </button>
          <span>
            계정이 없다면? <Link to="/register">회원가입 하기</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
