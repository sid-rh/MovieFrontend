import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { movies } from '../data/movies';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const MovieBanner = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin-bottom: 30px;
`;

const Field = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.div`
  margin-bottom: 10px;
  font-weight: bold;
`;

const TimeOptions = styled.div`
  display: flex;
  gap: 10px;
`;

const TimeButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background: ${props => props.selected ? '#000' : '#f0f0f0'};
  color: ${props => props.selected ? '#fff' : '#000'};
  cursor: pointer;
`;

const BookButton = styled.button`
  width: 100%;
  padding: 15px;
  background: black;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background: #333;
  }
`;

const TicketCounter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CounterButton = styled.button`
  padding: 5px 10px;
  border: none;
  background: #f0f0f0;
  cursor: pointer;
`;

export default function Selection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addBooking } = useAppContext();
  const movie = movies.find(m => m.id === parseInt(id));

  const [tickets, setTickets] = useState(1);
  const [time, setTime] = useState('12:00');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);

  const handleBook = async () => {
    setLoading(true);
    const booking = {
      movie: movie.name,
      tickets,
      time,
      date,
    };
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addBooking(booking);
    toast.success('Tickets Booked!');
    navigate('/activity');
  };

  if (!movie) return <div>Movie not found</div>;

  return (
    <Container>
      <MovieBanner src={movie.image} alt={movie.name} />
      <Title>{movie.name} ({movie.year})</Title>

      <Field>
        <Label>Ticket Count</Label>
        <TicketCounter>
          <CounterButton onClick={() => setTickets(Math.max(1, tickets - 1))}>-</CounterButton>
          <span>{tickets}</span>
          <CounterButton onClick={() => setTickets(tickets + 1)}>+</CounterButton>
        </TicketCounter>
      </Field>

      <Field>
        <Label>Show Time</Label>
        <TimeOptions>
          <TimeButton
            selected={time === '9:00'}
            onClick={() => setTime('9:00')}
          >
            9:00
          </TimeButton>
          <TimeButton
            selected={time === '12:00'}
            onClick={() => setTime('12:00')}
          >
            12:00
          </TimeButton>
          <TimeButton
            selected={time === '18:00'}
            onClick={() => setTime('18:00')}
          >
            18:00
          </TimeButton>
        </TimeOptions>
      </Field>

      <Field>
        <Label>Date</Label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
        />
      </Field>

      <BookButton onClick={handleBook} disabled={loading}>
        {loading ? 'Booking...' : 'Book Ticket'}
      </BookButton>
    </Container>
  );
}