import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction
) => {
  if (err instanceof Error) {
    return response.json({
      status: "error",
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};

export default errorHandler;
