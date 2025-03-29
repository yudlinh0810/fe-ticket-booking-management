import { useParams } from "react-router";
import styles from "../../styles/detailCar.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getDetailCar } from "../../services/car.service";
import Loading from "../../components/Loading";
import { dateTimeTransform } from "../../utils/transform";
import { Link } from "react-router-dom";

const DetailCar = () => {
  const { id } = useParams();
  const idFetch = id ?? "0";

  const { data, isLoading, error } = useQuery({
    queryKey: ["car"],
    queryFn: () => getDetailCar(idFetch),
    staleTime: 5 * 60 * 10,
  });

  const car = data ?? null;
  const imgsLength = car?.images?.length ?? 0;
  const imageList = car?.images ?? null;

  console.log(car);

  if (isLoading) return <Loading />;
  if (error) return <p className={styles.error}>Lỗi khi tải dữ liệu</p>;

  return (
    <div className={styles.container}>
      <div className={styles["feat-back"]}>
        <Link to={`/car-manage`} className={styles["btn-back"]}>
          Quay lại
        </Link>
      </div>
      <div className={styles["detail-car"]}>
        <div className={styles.title}>
          <h2 className={styles["content-title"]}>Thông tin chi tiết</h2>
          <div className={styles["feat-list"]}>
            <Link
              to={`/car-manage/update/${id}`}
              className={`${styles["btn-update"]} ${styles["feat-item"]}`}
            >
              Cập nhật
            </Link>
            <button className={`${styles["btn-delete"]} ${styles["feat-item"]}`}>Xóa</button>
          </div>
        </div>
        <ul className={styles.detail}>
          {[
            { label: "Biển số xe", value: car?.licensePlate },
            { label: "Sức chứa", value: car?.capacity },
            { label: "Loại xe", value: car?.type },
            { label: "Ngày tạo", value: dateTimeTransform(car?.createAt, "DD-MM-YYYY") },
            { label: "Ngày cập nhật", value: dateTimeTransform(car?.updateAt, "DD-MM-YYYY") },
          ].map((item, index) => (
            <li key={index} className={styles.group}>
              <p className={styles.title}>{item.label}</p>
              <input className={styles.data} value={item.value ?? "N/A"} readOnly />
            </li>
          ))}
          <li className={`${styles.group}`}>
            <p className={`${styles.title}`}>Hình ảnh</p>
            <div className={`${styles["img-list"]}`}>
              {car?.images && imgsLength > 0
                ? imageList?.map((img, index) => (
                    <div key={index} className={`${styles["img-item"]}`}>
                      <img src={img.urlImg} alt={`Hình ảnh ${index}`} className={`${styles.img}`} />
                    </div>
                  ))
                : null}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DetailCar;
