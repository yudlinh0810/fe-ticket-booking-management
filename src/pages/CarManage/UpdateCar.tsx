import { useCustomMutation } from "../../hooks/useCustomQuery";
import { updateCar } from "../../services/car.service";

const UpdateCar = () => {
  const updateMutation = useCustomMutation(updateCar, "/car-manage");
  const handleUpdateCar = async () => {
    const updateCar = {
      id: 12,
      licensePlate: "43A-212.12",
      capacity: null,
      type: "Xe giường nằm",
      isMain: 0,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(updateCar));
    updateMutation.mutate(formData);
  };
  return (
    <div>
      <button onClick={handleUpdateCar}>Update</button>
    </div>
  );
};

export default UpdateCar;
