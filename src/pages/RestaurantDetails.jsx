import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function RestaurantPage() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]); 
  const [newReview, setNewReview] = useState({ descricao: '', nota: '' });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchRestaurant() {
      try {
        setIsLoading(true);
        const restaurantResponse = await axios.get(`http://localhost:4000/restaurants/${id}`);
        const reviewsResponse = await axios.get(`http://localhost:4000/reviews/restaurant/${id}`);
        setRestaurant(restaurantResponse.data);
        setReviews(Array.isArray(reviewsResponse.data) ? reviewsResponse.data : []); 
      } catch (err) {
        setError('Erro ao carregar os dados do restaurante.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchRestaurant();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const reviewData = {
        descricao: newReview.descricao,
        nota: parseFloat(newReview.nota),
        id_usuario: user.id_usuario,
        id_restaurante: id,
      };

      await axios.post('http://localhost:4000/reviews', reviewData);
  
      setReviews([...reviews, { ...reviewData, nome: user.nome }]);
      setNewReview({ descricao: '', nota: '' });
    } catch (err) {
      setError('Erro ao enviar avaliação.');
    }
  };  

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
            <RatingValue>{restaurant.numero_avaliacoes}</RatingValue>
          </RestaurantRating>
        </RestaurantInfo>
      </RestaurantHeader>

      <Section>
        <SectionTitle>Avaliações</SectionTitle>
        {user && (
          <ReviewForm onSubmit={handleReviewSubmit}>
            <Input
              type="text"
              placeholder="Escreva sua avaliação"
              value={newReview.descricao}
              onChange={(e) => setNewReview({ ...newReview, descricao: e.target.value })}
              required
            />
            <Input
              type="number"
              placeholder="Nota (1 a 5)"
              value={newReview.nota}
              onChange={(e) => setNewReview({ ...newReview, nota: e.target.value })}
              required
              min="1"
              max="5"
              step="0.1"
            />
            <Button type="submit">Enviar Avaliação</Button>
          </ReviewForm>
        )}
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <ReviewItem key={index}>
              <ReviewHeader>
                <ReviewAuthor>{review.nome}</ReviewAuthor>
                <ReviewRating>
                  <Star>★</Star>
                  <RatingValue>{review.nota.toFixed(1)}</RatingValue>
                </ReviewRating>
              </ReviewHeader>
              <ReviewText>{review.descricao}</ReviewText>
            </ReviewItem>
          ))
        ) : (
          <NoReviewsMessage>Esse restaurante ainda não possui avaliações.</NoReviewsMessage>
        )}
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

const NoReviewsMessage = styled.p`
  font-size: 1rem;
  color: #6b7280;
  text-align: center;
  margin-top: 1rem;
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

const ReviewForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
`;

const Button = styled.button`
  background-color: #f97316;
  color: white;
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #ea580c;
  }
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
  font-size: 1.25rem;
  font-weight: 700;
  color: #4b5563;
`;

const ReviewRating = styled.div`
  display: flex;
  align-items: center;
`;

const ReviewText = styled.p`
  color: #6b7280;
`;