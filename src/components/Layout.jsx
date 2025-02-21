import { useAppContext } from '../context/AppContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

const Sidebar = styled.div`
  width: 240px;
  height: 100vh;
  background: #000;
  color: white;
  padding: 20px;
  position: fixed;
  left: 0;
  top: 0;
`;

const Logo = styled.div`
  font-size: 24px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  text-decoration: none;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const MainContent = styled.div`
  margin-left: 240px;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  align-items: center;
  gap: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoutButton = styled.button`
  background: black;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #333;
  }
`;

export default function Layout({ children }) {
  const { logout } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <Sidebar>
        <Logo>
          🎬 Almanack
        </Logo>
        <NavItem to="/booking">
          📽 Booking
        </NavItem>
        <NavItem to="/activity">
          📋 Activity
        </NavItem>
      </Sidebar>
      <MainContent>
        <Header>
          <UserInfo>
            👤 Naval Ravikant
          </UserInfo>
          <LogoutButton onClick={handleLogout}>
            Logout
          </LogoutButton>
        </Header>
        {children}
      </MainContent>
    </div>
  );
}