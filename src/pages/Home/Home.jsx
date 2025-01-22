import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import RestaurantCard from '../../components/RestaurantCards';

function HomePage() {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        setIsLoading(true);
        const response = await axios.get(`${apiUrl}/restaurants`);
        setRestaurants(response.data); 
        console.log('o que recebeu',response.data);
      } catch (err) {
        setError("Erro ao carregar os dados.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchRestaurants();
  }, []);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <Main>
      <Title>Restaurantes Disponíveis</Title>
      <RestaurantGrid>
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id_restaurante} {...restaurant} />
        ))}
      </RestaurantGrid>
    </Main>
  );
}

export default HomePage;

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 1.5rem;
`;

const RestaurantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;
