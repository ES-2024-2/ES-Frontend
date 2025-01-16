import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const restaurants = [
    {
      id: 1,
      name: "Hot Dog Caramelo",
      cuisine: "Brasileira",
      rating: 4.9,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe0Nnpf-Js9Wt9EUV1KMj0LS9rpk_ENvHLZQ&s",
      menu: [
        {
          category: "Entradas",
          items: [
            { name: "Pão de queijo", price: 12 },
            { name: "Coxinha", price: 8 },
          ],
        },
        {
          category: "Pratos Principais",
          items: [
            { name: "Feijoada", price: 45 },
            { name: "Moqueca de peixe", price: 55 },
          ],
        },
      ],
      reviews: [
        { author: "Jhonny Spider", rating: 5, text: "Mto bom" },
        { author: "Leandro", rating: 4, text: "Caaaaaroooo" },
      ],
    },
    { id: 2, name: "Macarrão da tia", cuisine: "Italiana", rating: 4.2, imageUrl: "https://s2-receitas.glbimg.com/JAZaJrRJpVfXRP1BZwbAsUcuYLw=/0x0:1280x800/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_1f540e0b94d8437dbbc39d567a1dee68/internal_photos/bs/2022/R/X/Lj3rwSQpm7BgzSEvJ1Mw/macarrao-simples-como-fazer.jpg",
        menu: [
            {
              category: "Entradas",
              items: [
                { name: "Pão de queijo", price: 12 },
                { name: "Coxinha", price: 8 },
              ],
            },
            {
              category: "Pratos Principais",
              items: [
                { name: "Feijoada", price: 45 },
                { name: "Moqueca de peixe", price: 55 },
              ],
            },
          ],
        reviews: [
            { author: "Jhonny Spider", rating: 5, text: "Mto bom" },
            { author: "Leandro", rating: 4, text: "Caaaaaroooo" },
        ],
    },

    { id: 3, name: "Sushi Caro", cuisine: "Japonesa", rating: 4.7, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaXA8gzWE_yYxvhJWUBYyqs3kJXuAd1UDstw&s",
        menu: [
            {
              category: "Entradas",
              items: [
                { name: "Pão de queijo", price: 12 },
                { name: "Coxinha", price: 8 },
              ],
            },
            {
              category: "Pratos Principais",
              items: [
                { name: "Feijoada", price: 45 },
                { name: "Moqueca de peixe", price: 55 },
              ],
            },
          ],
        reviews: [
            { author: "Jhonny Spider", rating: 5, text: "Mto bom" },
            { author: "Leandro", rating: 4, text: "Caaaaaroooo" },
        ],
    },
    { id: 4, name: "Burger Podrão", cuisine: "Americana", rating: 4.0, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ1MRcxQCAx4r3lYWIpSfloyjCINEgAA_a8A&s", 
        menu: [
            {
              category: "Entradas",
              items: [
                { name: "Pão de queijo", price: 12 },
                { name: "Coxinha", price: 8 },
              ],
            },
            {
              category: "Pratos Principais",
              items: [
                { name: "Feijoada", price: 45 },
                { name: "Moqueca de peixe", price: 55 },
              ],
            },
          ],
        reviews: [
            { author: "Jhonny Spider", rating: 5, text: "Mto bom" },
            { author: "Leandro", rating: 4, text: "Caaaaaroooo" },
        ],
    },
]

function RestaurantPage() {
    const { id } = useParams();
    const restaurant = restaurants.find(r => r.id === parseInt(id));
  
    if (!restaurant) {
      return <div>Restaurante não encontrado</div>;
    }
  
    return (
      <Main>
        <RestaurantHeader>
          <RestaurantImage src={restaurant.imageUrl} alt={restaurant.name} />
          <RestaurantInfo>
            <RestaurantName>{restaurant.name}</RestaurantName>
            <RestaurantCuisine>{restaurant.cuisine}</RestaurantCuisine>
            <RestaurantRating>
              <Star>★</Star>
              <RatingValue>{restaurant.rating.toFixed(1)}</RatingValue>
            </RestaurantRating>
          </RestaurantInfo>
        </RestaurantHeader>
  
        <Section>
          <SectionTitle>Cardápio</SectionTitle>
          {restaurant.menu.map((category, index) => (
            <MenuCategory key={index}>
              <MenuCategoryTitle>{category.category}</MenuCategoryTitle>
              {category.items.map((item, itemIndex) => (
                <MenuItem key={itemIndex}>
                  <MenuItemName>{item.name}</MenuItemName>
                  <MenuItemPrice>R$ {item.price.toFixed(2)}</MenuItemPrice>
                </MenuItem>
              ))}
            </MenuCategory>
          ))}
        </Section>
  
        <Section>
          <SectionTitle>Avaliações</SectionTitle>
          {restaurant.reviews.map((review, index) => (
            <ReviewItem key={index}>
              <ReviewHeader>
                <ReviewAuthor>{review.author}</ReviewAuthor>
                <ReviewRating>
                  <Star>★</Star>
                  <RatingValue>{review.rating.toFixed(1)}</RatingValue>
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
