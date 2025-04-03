import styles from "../styles/image.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, useRef, useState } from "react";
import { IsMain } from "../types/car.type";
import { deleteImgCar, updateImgCar } from "../services/car.service";
import { useCustomMutation } from "../hooks/useCustomQuery";

interface ImageProps {
  id: number;
  urlImg: string;
  urlPublicImg: string;
  isMain: IsMain;
  imgCUD: boolean;
}

const Image: React.FC<ImageProps> = ({ id, urlImg, urlPublicImg, isMain, imgCUD }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [previewImg, setPreviewImg] = useState<string>(urlImg);

  const mutateUpdate = useCustomMutation(updateImgCar, "car");
  const mutateDelete = useCustomMutation(deleteImgCar, "car");

  const handleClickUpdate = () => {
    fileRef.current?.click();
  };

  const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (e.target.files) {
      const newFile = e.target.files[0];

      const data = {
        id: id,
        urlImg: urlImg,
        urlPublicImg: urlPublicImg,
        isMain: isMain,
        role: "car",
      };

      formData.append("file", newFile);
      formData.append("data", JSON.stringify(data));

      mutateUpdate.mutate(formData);
      setPreviewImg(URL.createObjectURL(newFile));
    }
  };

  const handleDeleteImg = () => {
    const data = {
      id: id,
      urlPublicImg: urlPublicImg,
    };
    console.log(data);
    mutateDelete.mutate(data);
  };

  return (
    <div className={styles.container}>
      <img src={previewImg || ""} alt={`Hình ảnh `} className={`${styles.img}`} />
      {imgCUD ? (
        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles["start-btn"]} ${styles.btn}`}
            title="Ảnh chính"
            // onClick={handleClickIsMain}
          >
            <FontAwesomeIcon
              className={`${styles.ic} ${isMain ? styles.main : ""}`}
              icon={faStar}
            />
          </button>
          <button
            type="button"
            className={`${styles["update-btn"]} ${styles.btn}`}
            title="Cập nhật"
            onClick={handleClickUpdate}
          >
            <FontAwesomeIcon className={`${styles.ic}`} icon={faPenToSquare} />
          </button>
          <button
            type="button"
            className={`${styles["delete-btn"]} ${styles.btn}`}
            title="Xóa"
            onClick={handleDeleteImg}
          >
            <FontAwesomeIcon className={`${styles.ic}`} icon={faTrash} />
          </button>
        </div>
      ) : null}
      {/* hidden */}
      <input
        ref={fileRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        style={{ display: "none" }}
        onChange={handleChangeImg}
      />
    </div>
  );
};

export default Image;
