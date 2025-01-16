import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function RestaurantCard({ id, name, cuisine, rating, imageUrl }) {
  return (
    <Card to={`/restaurant/${id}`}>
      <Image src={imageUrl || "/placeholder.svg"} alt={name} />
      <Content>
        <Name>{name}</Name>
        <Cuisine>{cuisine}</Cuisine>
        <Rating>
          <Star>★</Star>
          <RatingValue>{rating.toFixed(1)}</RatingValue>
        </Rating>
      </Content>
    </Card>
  );
}

export default RestaurantCard;

const Card = styled(Link)`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-decoration: none;
  display: block;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 1rem;
`;

const Name = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
`;

const Cuisine = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;

const Star = styled.span`
  color: #fbbf24;
  margin-right: 0.25rem;
`;

const RatingValue = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
`;

