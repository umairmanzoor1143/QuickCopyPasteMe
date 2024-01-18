import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import isArray from "lodash/isArray";

import { normalizeObjectForAPI } from "utils";
import {
  ApiModelDataTypes,
  ApiModelMapping,
  RequestOptions,
} from "./apiModelMapping";

type NormalizeObjectOptions<T> = {
  omit: (keyof T)[];
  ignore: (keyof T)[];
};

export type UpdateMutationParams<
  T extends keyof typeof ApiModelMapping,
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
> = {
  modelName: T;
  requestOptions?: RequestOptions;
  mutationOptions?: UseMutationOptions<TData, TError, TVariables, TContext>;
  queryKey?: QueryKey;
  listQueryKey?: QueryKey;
  dataKey?: keyof ApiModelDataTypes[T];
  normalizeObjectOptions?: NormalizeObjectOptions<ApiModelDataTypes[T]>;
};

export default function useUpdateItem<T extends keyof typeof ApiModelMapping>({
  modelName,
  requestOptions = {},
  mutationOptions = {},
  queryKey,
  listQueryKey,
  dataKey,
  normalizeObjectOptions = { omit: [], ignore: [] },
}: UpdateMutationParams<
  T,
  void,
  unknown,
  { slug: string; data: Partial<ApiModelDataTypes[T]> }
>) {
  const queryClient = useQueryClient();
  const { model } = ApiModelMapping[modelName];

  const { omit = [], ignore = [] } = normalizeObjectOptions;

  return useMutation<
    void,
    unknown,
    { slug: string; data: Partial<ApiModelDataTypes[T]> }
  >({
    mutationFn: async ({ slug, data }) => {
      await model.update(
        slug,
        normalizeObjectForAPI(
          data as ApiModelDataTypes[T],
          omit,
          ignore
        ) as any,
        requestOptions
      );
    },
    onSuccess: (_, { slug, data }) => {
      const defaultQueryKey = queryKey ? queryKey : [modelName, slug];
      queryClient.setQueryData(
        defaultQueryKey,
        (oldData?: ApiModelDataTypes[T]) => {
          if (oldData) {
            const mewData = {
              ...oldData,
              ...data,
            };
            return mewData;
          }

          return oldData;
        }
      );
      queryClient.setQueryData(
        listQueryKey || [modelName],
        (oldData: ApiModelDataTypes[T][] = []) => {
          if (isArray(oldData)) {
            return oldData.map((item) =>
              (item as any)[dataKey || "slug"] === slug
                ? { ...item, ...data }
                : item
            );
          }

          return oldData;
        }
      );
    },
    ...mutationOptions,
  });
}
