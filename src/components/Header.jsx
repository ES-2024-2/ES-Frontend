import styled from 'styled-components'
import Link from 'next/link'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo href="/">FoodieReviews</Logo>
        <LoginButton href="/login">Login</LoginButton>
      </HeaderContent>
    </HeaderContainer>
  )
}


const HeaderContainer = styled.header`
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #f97316;
  text-decoration: none;
`

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
`