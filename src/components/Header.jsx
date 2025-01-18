import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

export function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo href="/">FoodieReviews</Logo>
        {user ? (
          <UserGreeting>
            <span>Bem vindo, {user.nome}</span>
            <LogoutButton onClick={logout}>Sair</LogoutButton>
          </UserGreeting>
        ) : (
          <LoginButton to="/login">Login</LoginButton>
        )}
      </HeaderContent>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const HeaderContent = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #f97316;
  text-decoration: none;
`;

const LoginButton = styled(Link)`
  background-color: #f97316;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #ea580c;
  }
`;

const UserGreeting = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoutButton = styled.button`
  background-color: #f97316;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #ea580c;
  }
`;
