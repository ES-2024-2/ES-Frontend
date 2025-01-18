import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';

function RestaurantPage() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRestaurant() {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:4000/restaurants/${id}`);
        setRestaurant(response.data);
      } catch (err) {
        setError("Erro ao carregar os dados do restaurante.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchRestaurant();
  }, [id]);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!restaurant) {
    return <p>Restaurante não encontrado.</p>;
  }

  return (
    <Main>
      <RestaurantHeader>
        <RestaurantImage src={restaurant.imagem} alt={restaurant.id_restaurante} />
        <RestaurantInfo>
          <RestaurantName>{restaurant.id_restaurante}</RestaurantName>
          <RestaurantCuisine>{restaurant.endereco}</RestaurantCuisine>
          <RestaurantRating>
            <Star>★</Star>
            <RatingValue>{restaurant.numero_avaliacoes.toFixed(1)}</RatingValue>
          </RestaurantRating>
        </RestaurantInfo>
      </RestaurantHeader>

      <Section>
        <SectionTitle>Cardápio</SectionTitle>
        {restaurant.menu && restaurant.menu.map((category, index) => (
          <MenuCategory key={index}>
            <MenuCategoryTitle>{category.category}</MenuCategoryTitle>
            {category.items.map((item, itemIndex) => (
              <MenuItem key={itemIndex}>
                <MenuItemName>{item.name}</MenuItemName>
                <MenuItemPrice>R$ {item.price}</MenuItemPrice>
              </MenuItem>
            ))}
          </MenuCategory>
        ))}
      </Section>

      <Section>
        <SectionTitle>Avaliações</SectionTitle>
        {restaurant.reviews && restaurant.reviews.map((review, index) => (
          <ReviewItem key={index}>
            <ReviewHeader>
              <ReviewAuthor>{review.author}</ReviewAuthor>
              <ReviewRating>
                <Star>★</Star>
                <RatingValue>{review.rating}</RatingValue>
              </ReviewRating>
            </ReviewHeader>
            <ReviewText>{review.text}</ReviewText>
          </ReviewItem>
        ))}
      </Section>
    </Main>
  );
}

export default RestaurantPage;

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const RestaurantHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const RestaurantImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-right: 2rem;
`;

const RestaurantInfo = styled.div`
  flex: 1;
`;

const RestaurantName = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const RestaurantCuisine = styled.p`
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
`;

const RestaurantRating = styled.div`
  display: flex;
  align-items: center;
`;

const Star = styled.span`
  color: #fbbf24;
  margin-right: 0.25rem;
  font-size: 1.5rem;
`;

const RatingValue = styled.span`
  font-size: 1.25rem;
  font-weight: 500;
  color: #4b5563;
`;

const Section = styled.section`
  background-color: white;
  border-radius: 0.5rem;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const MenuCategory = styled.div`
  margin-bottom: 1.5rem;
`;

const MenuCategoryTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #4b5563;
  margin-bottom: 0.5rem;
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const MenuItemName = styled.span`
  font-size: 1rem;
  color: #1f2937;
`;

const MenuItemPrice = styled.span`
  font-size: 1rem;
  color: #6b7280;
`;

const ReviewItem = styled.div`
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
  margin-bottom: 1rem;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ReviewAuthor = styled.span`
  font-weight: 500;
  color: #4b5563;
`;

const ReviewRating = styled.div`
  display: flex;
  align-items: center;
`;

const ReviewText = styled.p`
  color: #6b7280;
`;
