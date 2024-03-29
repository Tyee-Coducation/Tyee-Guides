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
    required: true,
  },
  classRoom: {
    type: String,
    required: true,
  },
  ratings: {
    type: Object,
  },
  genRatings: {
    type: Object,
  },
  votedUsers: {
    type: Array,
    default: [],
  },
  subjects: {
    type: Array,
    required: true,
  },
});

const TyeeGuidesClass = models.Class || model("Class", ClassSchema);

export default TyeeGuidesClass;
