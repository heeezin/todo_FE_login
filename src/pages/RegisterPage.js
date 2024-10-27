import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import api from "../utils/api";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [secpassword,setSecPassword] = useState('')
  const [error,setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setLoading(true)
    try {
      if (!name || !email || !password || !secpassword) {
        setError('필수 정보를 모두 입력해 주세요.');
        return
      }
      if(password !== secpassword){
        setError("패스워드가 일치하지 않습니다. 다시 입력해 주세요.")
        return
      }
      const res = await api.post('/user',{name,email,password})
      if(res.status===200){
        navigate('/login')
      } else {
        throw new Error(res.data.message)
      }
    } catch (error) {
      setError(error.message)
    }
  }
  return (
    <div className="display-center">
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="string" placeholder="Name" onChange={(e)=>setName(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email"  onChange={(e)=>setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"  onChange={(e)=>setPassword(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>re-enter the password</Form.Label>
          <Form.Control type="password" placeholder="re-enter the password"  onChange={(e)=>setSecPassword(e.target.value)} />
        </Form.Group>
        <div className="error-box">{error && <div>{error}</div>}</div>
        <div className="button-box">
          <button className="button-primary" type="submit" disabled={loading}>
            {loading ? 'Signing up..' : 'Sign up'}
          </button>
          <span>계정이 있다면? <Link to="/login">로그인 하기</Link></span>
        </div>
      </Form>
    </div>
  );
};

export default RegisterPage;
