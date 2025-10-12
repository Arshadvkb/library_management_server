import bookModel from "../models/bookModel.js";
import rentalModel from "../models/rentalModel.js";

const rentBook = async (req, res) => {
  const { user_id, book_id, dueDate } = req.body;

  try {
    const book = bookModel.findById(book_id);
    if (!book) {
      return res.json({ success: "false", message: "No book found" });
    }
    if (book.available_count < 1) {
      return res.json({ success: false, message: "book not available" });
    } else {
      book.available_count -= 1;

      const rental = new rentalModel({
        user: user_id,
        book: book_id,
        due_date: dueDate,
      });
      await rental.save();

      return res.json({ success: true, message: "book rented successdfuly" });
    }
  } catch (error) {
    console.log("server error");

    return res.json({ success: false, message: error.message });
  }
};

const return_book = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id=" + id);
    const rental = await rentalModel.findById(id);
    if (!rental) {
      return res.json({ success: false, message: "No rental found" });
    }
    if (rental.status === "returned") {
      return res.json({ success: false, message: "Book already returned" });
    }
    rental.return_date = new Date();
    rental.status = "returned";
    await rental.save();

    rental.book.available_count += 1;
    await rental.book.save();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const view_rented_book = async (req, res) => {
  try {
    const rentals = await rentalModel
      .find({ user: req.params.id })
      .sort({ rental_date: -1 });

    const activeRentals = rentals.filter((r) => r.status === "active");

    res.json({
      success: true,
      message: "rental details",
      allRentals: rentals,
      activeRentals,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export { rentBook, return_book, view_rented_book };
