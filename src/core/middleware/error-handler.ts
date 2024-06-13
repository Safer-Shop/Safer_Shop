import { ErrorRequestHandler } from "express";

import { CustomError } from "../utils/createError";

export const errorHandler: ErrorRequestHandler = async (
  error,
  req,
  res,
  next
) => {
  if (error instanceof CustomError) {
    console.log(`[ERROR] ${req.method} ${req.originalUrl} -> ${error.message}`);
    return res.status(error.code).send({
      message: error.message,
      stack: error.options,
    });
  }

  next(error);
};
