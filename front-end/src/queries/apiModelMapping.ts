import DataSetDesign from 'models/dataSetDesign'
export const ApiModels = {
  DatasetDesign: "dataset-design",
} as const;

export const ApiModelMapping = {
  [ApiModels.DatasetDesign]: {
    model: DataSetDesign,
  },
} as const;

export type ApiModelDataTypes = {
  [ApiModels.DatasetDesign]: DatasetDesign;
};

export type RequestOptions = {
  query?: Record<string, any>;
  path?: string | undefined;
};
