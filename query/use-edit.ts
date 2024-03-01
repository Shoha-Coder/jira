// import { useMutation } from "@tanstack/vue-query";
// import { COLLECTION_DEALS, DB_ID } from "~/constants";
// import { DATABASE } from "~/libs/appwrite";

// export const useEditDeal = (refetch: Function) => {
//   const toast = useToast();
//   const { isPending, mutate } = useMutation({
//     mutationKey: ["edit-deals"],
//     mutationFn: (id: string) =>
//       DATABASE.deleteDocument(DB_ID, COLLECTION_DEALS, id),
//     onSuccess: () => {
//       toast.add({
//         title: "Success",
//         description: "Deal edited successfully!",
//         color: "blue",
//       });
//       refetch();
//     },
//   });
//   return { deleteDeal: mutate, isDeleting: isPending };
// };
