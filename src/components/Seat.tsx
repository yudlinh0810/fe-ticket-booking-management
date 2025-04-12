import { SeatStatusType } from "../types/type";

interface SeatProps {
  positionSeat: string;
  seatStatus: SeatStatusType;
}

const Seat: React.FC<SeatProps> = ({ positionSeat, seatStatus }) => {
  return (
    <div className={`seat ${seatStatus}`}>
      <span>{positionSeat}</span>
    </div>
  );
};

export default Seat;
