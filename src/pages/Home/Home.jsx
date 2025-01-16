import styled from 'styled-components'

import RestaurantCard from '../../components/RestaurantCards'

const restaurants = [
  { id: 1, name: "Hot Dog Caramelo", cuisine: "Brasileira", rating: 4.9, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe0Nnpf-Js9Wt9EUV1KMj0LS9rpk_ENvHLZQ&s" },
  { id: 2, name: "Macarrão da tia", cuisine: "Italiana", rating: 4.2, imageUrl: "https://s2-receitas.glbimg.com/JAZaJrRJpVfXRP1BZwbAsUcuYLw=/0x0:1280x800/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_1f540e0b94d8437dbbc39d567a1dee68/internal_photos/bs/2022/R/X/Lj3rwSQpm7BgzSEvJ1Mw/macarrao-simples-como-fazer.jpg" },
  { id: 3, name: "Sushi Caro", cuisine: "Japonesa", rating: 4.7, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaXA8gzWE_yYxvhJWUBYyqs3kJXuAd1UDstw&s" },
  { id: 4, name: "Burger Podrão", cuisine: "Americana", rating: 4.0, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ1MRcxQCAx4r3lYWIpSfloyjCINEgAA_a8A&s" },
]

function HomePage() {
  return (
    <Main>
      <Title>Restaurantes Mais Bem Avaliados</Title>
      <RestaurantGrid>
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} {...restaurant} />
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