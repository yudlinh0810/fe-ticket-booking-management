import styles from "../styles/ImageList.module.scss";
import DefaultImage from "./DefaultImage";

interface ImageData {
  urlImg: string;
}

const ImageList = ({ data }: { data: ImageData[] }) => {
  console.log(data);
  return (
    <div className={styles["img-list"]}>
      {data.map((img, index) => (
        <DefaultImage key={index} src={img.urlImg} />
      ))}
      {data.length === 0 && (
        <div className={styles["img-item"]}>
          <p className={styles.not}>No image</p>
        </div>
      )}
    </div>
  );
};

export default ImageList;
