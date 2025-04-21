import SeatMapNormal from "../../components/SeatMapNormal";
import SeatMapSleeper from "../../components/SeatMapSleeper";
import styles from "../../styles/manageTrip.module.scss";

// const ITEMS_PER_PAGE = 10;

const TripManage: React.FC = () => {
  // const seatArr: SeatType[] = [
  //   {
  //     id: 1,
  //     tripId: 2,
  //     position: "A1",
  //     status: "available",
  //   },
  //   {
  //     id: 2,
  //     tripId: 2,
  //     position: "A2",
  //     status: "available",
  //   },
  //   {
  //     id: 3,
  //     tripId: 2,
  //     position: "A3",
  //     status: "available",
  //   },
  //   {
  //     id: 4,
  //     tripId: 2,
  //     position: "A4",
  //     status: "available",
  //   },
  // ];

  return (
    <div className={styles.container}>
      <SeatMapSleeper />
      <SeatMapNormal />
    </div>
  );
};

export default TripManage;
