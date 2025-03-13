import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCarList } from "../services/car.service";
import { Car } from "../types/car.type";

const CarManage = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const filesRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [indexFileUpdate, setIndexFileUpdate] = useState<number>();

  const { data, error, isLoading } = useQuery({
    queryKey: ["carList"],
    queryFn: getCarList,
    refetchInterval: 1000 * 60 * 10,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error:</div>;

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
    fileRef.current?.click();
  };
  console.log("files", files);
  return (
    <div>
      {data?.map((car: Car, index) => (
        <div key={index}>{car?.name}</div>
      ))}
      <button type="button" onClick={handleClickChooseFiles}>
        Chọn ảnh
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
  );
};

export default CarManage;
