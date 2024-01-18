import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import produce from "immer";
import isArray from "lodash/isArray";

import {
  ApiModelDataTypes,
  ApiModelMapping,
  RequestOptions,
} from "./apiModelMapping";

type CreateMutationParams<T extends keyof typeof ApiModelMapping> = {
  modelName: T;
  requestOptions?: RequestOptions;
  mutationOptions?: Partial<
    UseMutationOptions<
      ApiModelDataTypes[T],
      unknown,
      Partial<ApiModelDataTypes[T]>,
      unknown
    >
  >;
  queryKey?: QueryKey;
  isPaginated?: boolean;
};

export default function useCreateItem<T extends keyof typeof ApiModelMapping>({
  modelName,
  queryKey,
  requestOptions = {},
  mutationOptions = {},
  isPaginated,
}: CreateMutationParams<T>) {
  const queryClient = useQueryClient();

  return useMutation<
    ApiModelDataTypes[T],
    unknown,
    Partial<ApiModelDataTypes[T]>
  >({
    mutationFn: async (data) => {
      const res = await ApiModelMapping[modelName].model.create(
        data as any,
        requestOptions
      );
      return res.data as ApiModelDataTypes[T];
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        queryKey || [modelName],
        (oldData: ApiModelDataTypes[T][] = []) => {
          if (isArray(oldData)) {
            return [...oldData, data];
          }
          // If data is paginated add to first page
          if (isPaginated) {
            const paginatedData: any = oldData;
            if (
              isArray(paginatedData.pages) &&
              paginatedData.pages?.[0]?.data?.length > 0
            ) {
              const nextState = produce(paginatedData, (draftState: any) => {
                draftState.pages[0].data.unshift(data);
              });
              return nextState as any;
            } else {
              queryClient.invalidateQueries([queryKey || modelName]);
            }
          }

          return oldData;
        }
      );
    },
    ...mutationOptions,
  });
}
