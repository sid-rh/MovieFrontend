import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { movies } from '../data/movies';

const SearchBox = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px 0;
`;

const MovieCard = styled.div`
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.02);
  }
`;

const MovieImage = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 10px;
`;

const MovieTitle = styled.div`
  margin-top: 10px;
  font-weight: bold;
`;

const Greeting = styled.h1`
  margin-bottom: 20px;
`;

export default function Booking() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredMovies = movies.filter(movie =>
    movie.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Greeting>Good Morning Mr. Naval Ravikant!</Greeting>
      <SearchBox
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <MoviesGrid>
        {filteredMovies.map(movie => (
          <MovieCard
            key={movie.id}
            onClick={() => navigate(`/selection/${movie.id}`)}
          >
            <MovieImage src={movie.image} alt={movie.name} />
            <MovieTitle>{movie.name} ({movie.year})</MovieTitle>
          </MovieCard>
        ))}
      </MoviesGrid>
    </div>
  );
}