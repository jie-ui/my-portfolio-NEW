export const errorController = (err, req, res, next) => {
  console.error(" Error caught by errorController:", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Mongoose CastError
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // ValidationError
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join("; ");
  }

  // Duplicate Key
  if (err.code === 11000) {
    statusCode = 409;
    message = `Duplicate field value for ${Object.keys(
      err.keyPattern
    ).join(", ")}`;
  }

  // JWT Errors 
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token. Please log in again.";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Your token has expired. Please log in again.";
  }

  // Default
  res.status(statusCode).json({
    ok: false,
    status: `${statusCode}`.startsWith("4") ? "fail" : "error",
    error: message,
  });
};
