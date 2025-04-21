import React, { useEffect, useState } from "react";
import { GoTriangleDown } from "react-icons/go";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styles from "../../styles/busManage.module.scss";
import { getBusList } from "../../services/bus.service";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";
import DefaultImage from "../../components/DefaultImage";

const ITEMS_PER_PAGE = 3;

const BusManage: React.FC = () => {
  const navigate = useNavigate();
  const { page } = useParams<{ page?: string }>();
  const location = useLocation();
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState<number>(
    page ? Math.max(1, parseInt(page, 10)) - 1 : 0
  );

  const urlMain = "/bus-manage";

  // Khi URL thay đổi, cập nhật currentPage
  useEffect(() => {
    const pageNum = page ? Math.max(1, parseInt(page, 10)) - 1 : 0;
    setCurrentPage(pageNum);
  }, [location.pathname]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["busList", selectedType, searchTerm, currentPage],
    queryFn: () => getBusList({ offset: currentPage * ITEMS_PER_PAGE, limit: ITEMS_PER_PAGE }),
    staleTime: 5 * 60 * 10,
    placeholderData: (previousData) => previousData,
  });

  const totalPage = data?.totalPage ?? 0;
  const busData = data?.data || [];

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
    setCurrentPage(selectedItem.selected); // Cập nhật state ngay lập tức
    navigate(newPage > 1 ? `/bus-manage/page/${newPage}` : `/bus-manage`, { replace: true });
  };

  const handleRedirectDetail = (id: number) => {
    navigate(`${urlMain}/detail/${id}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll lên đầu khi chuyển trang
  }, [data]);

  if (isLoading) return <Loading />;
  if (error) return <p className={styles.error}>Lỗi khi tải dữ liệu</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className={styles["search-input"]}
            onChange={handleSearch}
          />
        </div>
        <div className={`${"filter-type"} ${styles["type-list"]}`}>
          {["all", "xe thường", "xe giường nằm"].map((type) => (
            <div key={type} className={styles["type-item"]}>
              <div className={styles.radio}>
                <input
                  type="radio"
                  name="bus_type"
                  id={type}
                  value={type}
                  onChange={handleSelectedTypeChange}
                  checked={selectedType === type}
                />
              </div>
              <div className={styles.label}>
                <label htmlFor={type}>{type === "all" ? "Tất cả" : type}</label>
              </div>
            </div>
          ))}
        </div>
        <Link to={"/bus-manage/add"} className={styles["btn-add"]}>
          Thêm Xe
        </Link>
      </div>
      <div className={styles["table-wrapper"]}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>STT</th>
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
            {busData.map((bus, index) => (
              <tr key={index}>
                <td className={styles["bus-id"]} onClick={() => handleRedirectDetail(bus.id)}>
                  {index + 1 + currentPage * ITEMS_PER_PAGE}
                </td>
                <td>
                  <DefaultImage src={bus.image?.urlImg} />
                </td>
                <td>{bus.licensePlate}</td>
                <td>{bus.capacity ? `${bus.capacity} chỗ` : "N/A"} </td>
                <td>{bus.type}</td>
                <td>
                  <div className={styles["btn-list"]}>
                    <Link
                      to={`${urlMain}/detail/${bus.licensePlate}`}
                      className={`${styles["btn-detail"]} ${styles.btn}`}
                    >
                      Chi tiết
                    </Link>
                    <Link
                      to={`${urlMain}/update/${bus.licensePlate}`}
                      className={`${styles["btn-edit"]} ${styles.btn}`}
                    >
                      Cập nhật
                    </Link>
                    <button className={`${styles["btn-delete"]} ${styles.btn}`}>Xóa</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <Pagination
          pageCount={totalPage}
          onPageChange={handlePageClick}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default BusManage;
