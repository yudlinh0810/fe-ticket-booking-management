import React from "react";
import Seat from "./Seat";

const SeatMap = () => {
  const seats = Array.from({ length: 26 }); // 26 hàng ghế
  const seatsPerRow = 10;

  return (
    <div className="seat-wrapper">
      {seats.map((_, i) => {
        const rowIndex = Math.floor(i / seatsPerRow); // 0,1,2...
        const rowLetter = String.fromCharCode(rowIndex + 65); // A, B, C...
        const seatNumber = (i % seatsPerRow) + 1; // 1 - 10
        const positionSeat = `${rowLetter}${seatNumber}`;

        return (
          <Seat
            key={positionSeat}
            positionSeat={positionSeat}
            seatStatus="available" // hoặc truyền theo data thật
          />
        );
      })}
    </div>
  );
};

export default SeatMap;
