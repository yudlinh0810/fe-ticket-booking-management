import styles from "../styles/imageCUD.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { memo, useRef, useState } from "react";

interface ImageCUDProps {
  id?: number;
  imgCUD: boolean;
  imgFile: File;
  previewImg: string;
  isMain: boolean;
  onUpdate?: (id: number, newFile: File, newPreview: string) => void;
  onDelete?: (id: number) => void;
  onIsMain?: (id: number) => void;
}

const ImageCUD: React.FC<ImageCUDProps> = ({
  id,
  imgCUD = true,
  imgFile,
  previewImg,
  isMain,
  onUpdate,
  onDelete,
  onIsMain,
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(imgFile);
  const [previewImgFile, setPreviewImgFile] = useState<string | null>(previewImg);

  const handleClickUpdate = () => {
    fileRef.current?.click();
  };

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newImg = e.target.files[0];
      const newPreview = URL.createObjectURL(newImg);

      setImageFile(newImg);
      setPreviewImgFile(newPreview);

      //
      if (onUpdate && id !== undefined) {
        onUpdate(id, newImg, newPreview);
      }
    }
  };

  const handleClickIsMain = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    if (onIsMain && id !== undefined) onIsMain(id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    if (onDelete && id !== undefined) onDelete(id);
  };
  console.log(imageFile);
  return (
    <div className={styles.container}>
      <img src={previewImgFile || ""} alt={`Hình ảnh `} className={`${styles.img}`} />
      {imgCUD ? (
        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles["start-btn"]} ${styles.btn}`}
            title="Ảnh chính"
            onClick={handleClickIsMain}
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
            onClick={handleDelete}
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

export default memo(ImageCUD);
