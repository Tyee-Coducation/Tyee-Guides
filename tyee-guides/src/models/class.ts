import { Schema, model, models } from "mongoose";

const ClassSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  classInfo: {
    type: String,
  },
  classRoom: {
    type: String,
  },
  ratings: {
    type: Object,
    required: true,
  },
  comments: {
    type: Object,
  },
});

const TyeeGuidesClass = models.Class || model("Class", ClassSchema);

export default TyeeGuidesClass;
