import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import styled from '@emotion/styled';
import toast from 'react-hot-toast';

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
`;

const LoginBox = styled.div`
  background: black;
  padding: 40px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  color: white;
`;

const Logo = styled.div`
  text-align: center;
  font-size: 24px;
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: white;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: white;
  color: black;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/booking');
    } else {
      toast.error('Wrong Credentials');
      setUsername('');
      setPassword('');
    }
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Logo>
          🎬 Almanack
        </Logo>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
        </form>
      </LoginBox>
    </LoginContainer>
  );
}