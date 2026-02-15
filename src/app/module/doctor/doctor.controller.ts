import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { DoctorsService } from "./doctor.service";

const getAllDoctors = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DoctorsService.getAllDoctors();

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Doctors fetched successfully",
      data: result,
    });
  }
);

const getDoctorById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await DoctorsService.getDoctorById(id as string);

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Doctor fetched successfully",
      data: result,
    });
  }
);

const updateDoctor = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;

    const result = await DoctorsService.updateDoctor(id as string, payload);

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Doctor updated successfully",
      data: result,
    });
  }
);

const deleteDoctor = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await DoctorsService.deleteDoctor(id as string);

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Doctor deleted successfully",
      data: result,
    });
  }
);

export const DoctorController = {
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
