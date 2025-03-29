// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { Car } from "../types/car.type";
// import { addCar, deleteCar, getCarList, updateCar } from "../services/car.service";

// export const useCars = () => {
//   return useQuery<Car[]>({
//     queryKey: ["carList"],
//     queryFn: getCarList,
//     refetchInterval: 1000 * 60 * 5,
//   });
// };

// export const useAddCar = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: addCar,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["carList"] }); //Cập nhật danh sách sau khi chạy mutationFn
//     },
//     onError: (error) => {
//       console.log(error);
//     },
//   });
// };

// export const useUpdateCar = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: updateCar,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["carList"] }); //Cập nhật danh sách sau khi chạy mutationFn
//     },
//     onError: (error) => {
//       console.log(error);
//     },
//   });
// };

// export const useDeleteCar = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: deleteCar,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["carList"] }); //Cập nhật danh sách sau khi chạy mutationFn
//     },
//     onError: (error) => {
//       console.log(error);
//     },
//   });
// };
