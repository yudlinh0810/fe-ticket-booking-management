import styles from "../../styles/addCD.module.scss";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useCustomNavMutation } from "../../hooks/useCustomQuery";
import { addDriver } from "../../services/driver.service";

const AddDriver = () => {
  const dateBirthRef = useRef<HTMLInputElement>(null);
  const experienceYearRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    dateBirth: "",
    email: "",
    sex: "",
    password: "",
    experienceYears: "",
    licenseNumber: "",
  });

  const addMutate = useCustomNavMutation(
    addDriver,
    "/driver-manage",
    "Thêm mới thành công",
    "Thêm mới thất bại"
  );

  const handleChangeValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  };

  const handleAddDriver = async () => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(form));
    addMutate.mutate(formData);
  };

  const handleClickInputDate = () => {
    if (dateBirthRef.current) {
      dateBirthRef.current.showPicker();
    } else {
      return;
    }
  };

  const handleClickInputExperienceYears = () => {
    if (experienceYearRef.current) {
      experienceYearRef.current.showPicker();
    } else {
      return;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles["feats"]}>
        <Link to={`/driver-manage`} className={`${styles["btn-back"]} ${styles.btn}`}>
          Quay lại
        </Link>
        <button className={`${styles["btn-delete"]} ${styles.btn}`}>Xóa</button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddDriver();
        }}
        className={styles.form}
      >
        <div className={styles.title}>
          <h2 className={styles["content-title"]}>Thêm mới chuyến xe</h2>
        </div>
        <ul className={styles["form-group-list"]}>
          {[
            { label: "Email", name: "email", type: "text" },
            { label: "Họ và tên", name: "fullName", type: "text" },
          ].map((item, index) => (
            <li key={index} className={styles["form-group-item"]}>
              <p className={styles.title}>{item.label}</p>
              <input
                name={item.name}
                type={item.type}
                className={styles["form-control"]}
                value={form[item.name as keyof typeof form]}
                onChange={handleChangeValue}
              />
            </li>
          ))}

          <li className={styles["form-group-item"]}>
            <p className={styles.title}>Giới tính</p>
            <select
              name="sex"
              className={styles["form-control"]}
              value={form.sex}
              onChange={handleChangeValue}
            >
              <option>--- Chọn Giới Tính ---</option>
              {["male", "female", "other"].map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </li>

          {[
            { label: "Ngày sinh", name: "dateBirth", type: "date" },
            { label: "Số điện thoại", name: "phone", type: "text" },
          ].map((item, index) => (
            <li key={index} className={styles["form-group-item"]}>
              <p className={styles.title}>{item.label}</p>
              <input
                ref={item.name === "dateBirth" ? dateBirthRef : null}
                onClick={item.name === "dateBirth" ? handleClickInputDate : undefined}
                name={item.name}
                type={item.type}
                className={styles["form-control"]}
                value={form[item.name as keyof typeof form]}
                onChange={handleChangeValue}
              />
            </li>
          ))}

          {/*  */}

          {[
            { label: "Mã Giấy phép lái xe", name: "licenseNumber", type: "text" },
            { label: "Ngày cấp", name: "experienceYears", type: "date" },
          ].map((item, index) => (
            <li key={index} className={styles["form-group-item"]}>
              <p className={styles.title}>{item.label}</p>
              <input
                ref={item.name === "experienceYears" ? experienceYearRef : null}
                onClick={
                  item.name === "experienceYears" ? handleClickInputExperienceYears : undefined
                }
                name={item.name}
                type={item.type}
                className={styles["form-control"]}
                value={form[item.name as keyof typeof form]}
                onChange={handleChangeValue}
              />
            </li>
          ))}

          <li className={styles["form-group-item"]}>
            <p className={styles.title}>Địa chỉ</p>
            <textarea
              spellCheck={false}
              rows={3}
              name={"address"}
              className={`${styles["form-control"]} ${styles.textarea}`}
              value={form.address}
              onChange={handleChangeValue}
            />
          </li>

          <div className={styles["feat-add"]}>
            <button type="submit" className={styles["btn-add"]}>
              Thêm mới
            </button>
          </div>
        </ul>
      </form>
    </div>
  );
};

export default AddDriver;
