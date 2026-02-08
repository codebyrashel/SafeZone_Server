import { Request, Response } from "express";
import { SpecialityService } from "./speciality.service";

const createSpeciality = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const result = await SpecialityService.createSpeciality(payload);

    res.status(201).json({
      success: true,
      message: "Speciality created successfully",
      data: result,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create speciality",
      error: error.message,
    });
  }
};

const getAllSpecialities = async (_req: Request, res: Response) => {
  try {
    const specialities = await SpecialityService.getAllSpecialities();

    res.status(200).json({
      success: true,
      message: "Specialities fetched successfully",
      data: specialities,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch specialities",
      error: error.message,
    });
  }
};

const updateSpeciality = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const result = await SpecialityService.updateSpeciality(id, payload);

    res.status(200).json({
      success: true,
      message: "Speciality updated successfully",
      data: result,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update speciality",
      error: error.message,
    });
  }
};


const deleteSpeciality = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await SpecialityService.deleteSpeciality(id);

    res.status(200).json({
      success: true,
      message: "Speciality deleted successfully",
      data: result,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete speciality",
      error: error.message,
    });
  }
};

export const SpecialityController = {
  createSpeciality,
  getAllSpecialities,
  deleteSpeciality,
  updateSpeciality
};
