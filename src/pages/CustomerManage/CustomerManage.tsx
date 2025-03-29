import React, { useEffect, useState } from "react";
import { GoTriangleDown } from "react-icons/go";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../styles/customerManage.module.scss";
import { getCarList } from "../../services/car.service";
import Spin from "../../components/Loading";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 5;

const CustomerManage: React.FC = () => {
  const navigate = useNavigate();
  const { page } = useParams<{ page?: string }>(); // Lấy số trang từ URL
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Chuyển đổi page từ URL thành số nguyên, nếu không có thì mặc định là 1
  const currentPage = page ? Math.max(1, parseInt(page, 10)) - 1 : 0;

  const { data, isLoading, error } = useQuery({
    queryKey: ["customerList", selectedType, searchTerm, currentPage],
    queryFn: () => getCarList({ offset: currentPage * ITEMS_PER_PAGE, limit: ITEMS_PER_PAGE }),
    placeholderData: (previousData) => previousData,
  });

  const total = data?.total ?? 0;
  const carData = data?.data || [];

  // 🔹 Lọc và sắp xếp dữ liệu
  // const filteredCars = carData
  //   .filter((car) => selectedType === "all" || car.type.toLowerCase() === selectedType)
  //   .filter((car) => car.license_plate.toLowerCase().includes(searchTerm.toLowerCase()))
  //   .sort((a, b) =>
  //     sortOrder === "asc"
  //       ? a.license_plate.localeCompare(b.license_plate)
  //       : b.license_plate.localeCompare(a.license_plate)
  //   );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.trim());
  };

  const handleSelectedTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(e.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevSort) => (prevSort === "asc" ? "desc" : "asc"));
  };

  const handlePageClick = (selectedItem: { selected: number }) => {
    const newPage = selectedItem.selected + 1;
    navigate(`/car-manage/page/${newPage}`); // Điều hướng đúng path
  };

  useEffect(() => {
    window.scrollTo(0, 0); // scroll lên đầu khi chuyển trang
  }, [data]);
  useEffect(() => {
    console.log("Fetching data for page:", currentPage);
  }, [currentPage]);

  if (isLoading) return <Spin />;
  if (error) return <p className={styles.error}>Lỗi khi tải dữ liệu</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className="search">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className={styles["search-input"]}
            onChange={handleSearch}
          />
        </div>
        <div className={`${"filter-type"} ${styles["type-list"]}`}>
          {["all", "xe thường", "xe giường nằm"].map((type) => (
            <div key={type} className="type-item">
              <input
                type="radio"
                name="car_type"
                id={type}
                value={type}
                onChange={handleSelectedTypeChange}
                checked={selectedType === type}
              />
              <label htmlFor={type}>{type === "all" ? "Tất cả" : type}</label>
            </div>
          ))}
        </div>
        <button className={styles.addButton}>Thêm Xe</button>
      </div>
      <div className={styles["table-wrapper"]}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Hình Ảnh</th>
              <th>
                <div className={styles["license-plate"]}>
                  <p>Biển số xe</p>
                  <div className={styles["btn-sort"]}>
                    <GoTriangleDown
                      onClick={toggleSortOrder}
                      className={`${styles.triangle} ${
                        styles[`triangle-${sortOrder === "desc" ? "desc" : ""}`]
                      }`}
                    />
                  </div>
                </div>
              </th>
              <th>Sức Chứa</th>
              <th>Loại Xe</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {carData.map((car) => (
              <tr key={car.id}>
                <td>{car.id}</td>
                <td>
                  <img className={styles.img} src={car.images?.urlImg} alt="" />
                </td>
                <td>{car.license_plate}</td>
                <td>{car.capacity} chỗ</td>
                <td>{car.type}</td>
                <td>
                  <div className={styles["btn-list"]}>
                    <Link
                      to={`detail/${car.id}`}
                      className={`${styles["btn-detail"]} ${styles.btn}`}
                    >
                      Chi tiết
                    </Link>
                    <Link to={`edit/${car.id}`} className={`${styles["btn-edit"]} ${styles.btn}`}>
                      Sửa
                    </Link>
                    <button className={`${styles["btn-delete"]} ${styles.btn}`}>Xóa</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang với ReactPaginate */}
      <div className={styles.pagination}>
        <ReactPaginate
          previousLabel={"Trước"}
          nextLabel={"Tiếp"}
          breakLabel={"..."}
          pageCount={Math.ceil(total / ITEMS_PER_PAGE)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={styles["pagination-container"]}
          activeClassName={styles["active-page"]}
          previousClassName={styles["prev-btn"]}
          nextClassName={styles["next-btn"]}
          disabledClassName={styles["disabled-btn"]}
          forcePage={currentPage} // Đồng bộ số trang từ URL
        />
      </div>
    </div>
  );
};

export default CustomerManage;
