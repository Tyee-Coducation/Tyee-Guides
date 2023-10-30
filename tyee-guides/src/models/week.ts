import { Schema, model, models } from "mongoose";

const WeekSchema = new Schema({
  days: {
    type: Object,
    required: true,
  },
  week: {
    type: String,
    required: true,
  },
});

const TyeeGuidesWeek = models.Week || model("Week", WeekSchema);

export default TyeeGuidesWeek;
