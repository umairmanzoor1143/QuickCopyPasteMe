import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import isArray from "lodash/isArray";

import {
  ApiModelDataTypes,
  ApiModelMapping,
  RequestOptions,
} from "./apiModelMapping";

type DeleteMutationParams<T extends keyof typeof ApiModelMapping> = {
  modelName: T;
  requestOptions?: RequestOptions;
  mutationOptions?: Pick<UseMutationOptions, "mutationKey">;
  dataKey?: keyof ApiModelDataTypes[T];
  queryKey?: QueryKey;
};

export default function useDeleteItem<T extends keyof typeof ApiModelMapping>({
  modelName,
  requestOptions = {},
  mutationOptions = {},
  dataKey,
  queryKey,
}: DeleteMutationParams<T>) {
  const { model } = ApiModelMapping[modelName] || {};
  const queryClient = useQueryClient();

  return useMutation<void, unknown, { slug: string }>({
    ...mutationOptions,
    mutationFn: async ({ slug }) => {
      await model?.delete(slug, requestOptions);
    },
    onSuccess: (_, { slug }) => {
      queryClient.removeQueries({
        queryKey: [modelName, slug],
        exact: true,
      });
      queryClient.setQueryData(
        queryKey || [modelName],
        (oldData: ApiModelDataTypes[T][] = []) => {
          if (isArray(oldData)) {
            return oldData.filter(
              (item) => (item as any)[dataKey || "slug"] !== slug
            );
          }

          return oldData;
        }
      );
    },
  });
}
