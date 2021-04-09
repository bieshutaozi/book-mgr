const mongoose = require("mongoose");
const { getMeta } = require("../helpers");
const InventoryLogSchema = new mongoose.Schema({
  type:String,
  num:Number,
  user:String,

  meta: getMeta(),
});

mongoose.model("InventoryLog", InventoryLogSchema);
