import styled from '@emotion/styled';
import { useAppContext } from '../context/AppContext';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px;
  border-bottom: 2px solid #ddd;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

export default function Activity() {
  const { bookings } = useAppContext();

  return (
    <div>
      <Title>Activity</Title>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Movie</Th>
            <Th>Tickets</Th>
            <Th>Amount</Th>
            <Th>Time</Th>
            <Th>Date</Th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.id}>
              <Td>{booking.id}</Td>
              <Td>{booking.movie}</Td>
              <Td>{booking.tickets}</Td>
              <Td>${booking.amount}.00</Td>
              <Td>{booking.time}</Td>
              <Td>{booking.date}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}