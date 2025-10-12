import mongoose from "mongoose";

const rentalItemSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "book",
    required: true,
  },
  rented_copy_id: {
    type: Number,
  },
  return_date: {
    type: Date,
  },
});

const rentalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rental_date: {
      type: Date,
      default: Date.now,
    },
    due_date: {
      type: Date,
      required: [true, "Due date is required"],
    },
    total_books: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "returned", "overdue"],
      default: "active",
    },
    books: [rentalItemSchema],
  },
  {
    timestamps: true,
  }
);


rentalSchema.index({ user: 1 });
rentalSchema.index({ due_date: 1 });

const rentalModel =
  mongoose.model.Rental || mongoose.model("Rental", rentalSchema);

module.exports = rentalModel;
