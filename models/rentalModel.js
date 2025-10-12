import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    book: {
    
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
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
    return_date: {
      type: Date,
    },
   
    status: {
      type: String,
      enum: ["active", "returned", "overdue"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
rentalSchema.index({ user: 1 });
rentalSchema.index({ book: 1 });
rentalSchema.index({ due_date: 1 });

const rentalModel = mongoose.models.rental || mongoose.model("rental", rentalSchema);



export default rentalModel
