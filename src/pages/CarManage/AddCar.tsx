import { useRef, useState } from "react";
import { useCustomMutation } from "../../hooks/useCustomQuery";
import { addCar } from "../../services/car.service";

const AddCar = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const filesRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [indexFileUpdate, setIndexFileUpdate] = useState<number>();
  const mutationAddCar = useCustomMutation(addCar, "/car-manage");
  const handleAddCar = async () => {
    const newCar = {
      licensePlate: "43A-832.65",
      capacity: null,
      type: "Xe thường",
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(newCar));
    files.forEach((file) => {
      formData.append("files", file);
    });
    mutationAddCar.mutate(formData);
  };
  const handleClickChooseFiles = () => {
    filesRef.current?.click();
  };

  const handleUpdateFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0];
    if (!newFile || indexFileUpdate === undefined) return;
    setFiles((prev) => prev.map((file, index) => (index === indexFileUpdate ? newFile : file)));
    setPreviews((prev) =>
      prev.map((preview, index) =>
        index === indexFileUpdate ? URL.createObjectURL(newFile) : preview
      )
    );
  };

  const handleChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    setFiles((prev) => [...prev, ...newFiles]);
    setPreviews((prev) => [...prev, ...newFiles.map((file) => URL.createObjectURL(file))]);
  };

  const handleClickImg = (index: number) => {
    // setPreviews((prev) => prev.filter((_, i) => i !== index));
    // setFiles((prev) => prev.filter((_, i) => i !== index));
    setIndexFileUpdate(index);
    console.log("index", index);
    fileRef.current?.click();
  };

  console.log("files", files);
  return (
    <div>
      <button onClick={handleAddCar}>Add Car</button>
      <div>
        <button type="button" onClick={handleClickChooseFiles}>
          Chọn ảnh ik
        </button>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          {previews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`image-${index}`}
              onClick={() => handleClickImg(index)}
              style={{
                objectFit: "cover",
                width: "5rem",
                height: "5rem",
                cursor: "pointer",
                border: "1px solid black",
              }}
            />
          ))}
        </div>
        <input
          ref={filesRef}
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          multiple
          style={{ display: "none" }}
          onChange={handleChangeFiles}
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          style={{ display: "none" }}
          onChange={handleUpdateFile}
        />
      </div>
    </div>
  );
};

export default AddCar;
