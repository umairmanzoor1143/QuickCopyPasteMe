import Model from "models";

class DatacardModel extends Model<DatasetDesign> {
  constructor() {
    super("/datacard", "data-mng");
  }
}

const model = new DatacardModel();
export default model;
