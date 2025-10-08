import bookModel from "../models/bookModel.js";
import cloudinary from "../config/cloudinary.js";

const addBook = async (req, res) => {
  const { title, author, publishedDate, ISBN, count } = req.body;
  console.log(req.body);
  console.log(req.file);

  if (!title || !author || !publishedDate || !ISBN || !count) {
    return res.json({ success: false, message: "missing details" });
  }
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
      folder: "library_books",
    });

    const imageData = {
      public_id: uploadResult.public_id,
      secure_url: uploadResult.secure_url,
      width: uploadResult.width,
      height: uploadResult.height,
      format: uploadResult.format,
    };
    console.log(imageData);

    const existingBook = await bookModel.findOne({ ISBN });
    if (existingBook) {
      return res.json({
        success: false,
        message: "Book with this ISBN already exists",
      });
    }
    const book = new bookModel({
      title,
      author,
      publishedDate,
      ISBN,
      count,
      image: imageData,
    });
    await book.save();
    return res.json({ success: true, message: "Book added successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const viewBooks = async (req, res) => {
  try {
    const books = await bookModel.find();
    return res.json({ success: true, books });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const editBook = async (req, res) => {
  const { id } = req.params;
  const { title, ISBN, author, publishedDate } = req.body;

  try {
    const book = await bookModel.findByIdAndUpdate(
      id,
      { title, ISBN, author, publishedDate },
      { new: true, runValidators: true }
    );

    if (!book) {
      return res.json({ success: false, message: "No book found" });
    }

    return res.json({ success: true, message: "book updated" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.json({ success: false, message: "No id recieved" });
  }
  try {
    const deletebook = await bookModel.findByIdAndDelete(id);
    const result = await cloudinary.uploader.destroy(
      deletebook.image.public_id,
      {
        resource_type: "image",
      }
    );
    return res.json({ success: true, message: "Book deleted successfuly" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const fileAAAAA = async (req, res) => {
  const uploadResult = await cloudinary.uploader.upload(req.file.path, {
    resource_type: "auto",
    folder: "library_books",
  });

  const imageData = {
    public_id: uploadResult.public_id,
    secure_url: uploadResult.secure_url,
    width: uploadResult.width,
    height: uploadResult.height,
    format: uploadResult.format,
  };
  if (uploadResult) {
    console.log("success");

    return res.json({ success: true, message: imageData });
  } else {
    return res.json({ success: false, message: "no image" });
  }
};

export { addBook, viewBooks, editBook, deleteBook, fileAAAAA };
