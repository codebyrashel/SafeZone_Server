import status from "http-status";
import { Role, Speciality } from "../../../generated/prisma/client";
import AppError from "../../errorHelpers/AppError";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { IcreateDoctorPayload } from "./user.interface";

const createDoctor = async (payload: IcreateDoctorPayload) => {
  const specialities: Speciality[] = [];

  // Validate and collect specialities
  for (const specialityId of payload.specialities) {
    const speciality = await prisma.speciality.findUnique({
      where: {
        id: specialityId,
      },
    });

    if (!speciality) {
      // throw new Error(`Speciality with id ${specialityId} not found`);
      throw new AppError(status.NOT_FOUND,`Speciality with id ${specialityId} not found`);
    }

    specialities.push(speciality);
  }

  // Check if user already exists
  const userExists = await prisma.user.findUnique({
    where: {
      email: payload.doctor.email,
    },
  });

  if (userExists) {
    // throw new Error(`User with this email already exists`);
    throw new AppError(status.CONFLICT, `User with this email already exists`);
  }

  // Create auth user
  const userData = await auth.api.signUpEmail({
    body: {
      email: payload.doctor.email,
      password: payload.password,
      role: Role.DOCTOR,
      name: payload.doctor.name,
      needPasswordChange: true,
    },
  });

  try {
    const result = await prisma.$transaction(async (tx) => {
      // Create doctor
      const doctorData = await tx.doctor.create({
        data: {
          userId: userData.user.id,
          ...payload.doctor,
        },
      });

      // Prepare doctor-speciality relation data
      const doctorSpecialityData = specialities.map((speciality) => ({
        doctorId: doctorData.id,
        specialityId: speciality.id,
      }));

      // Insert relations
      await tx.doctorSpeciality.createMany({
        data: doctorSpecialityData,
      });

      // Fetch full doctor with relations
      const doctor = await tx.doctor.findUnique({
        where: {
          id: doctorData.id,
        },
        select: {
          id: true,
          userId: true,
          name: true,
          email: true,
          profilePhoto: true,
          contactNumber: true,
          address: true,
          registrationNumber: true,
          experience: true,
          gender: true,
          appointmentFee: true,
          qualification: true,
          currentWorkingPlace: true,
          designation: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              role: true,
              status: true,
              emailVerified: true,
              image: true,
              isDeleted: true,
              deletedAt: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          specialities: {
            select: {
              speciality: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          },
        },
      });

      return doctor;
    });

    return result;
  } catch (error) {
    console.log("Transaction error:", error);

    // rollback auth user if doctor creation fails
    await prisma.user.delete({
      where: {
        id: userData.user.id,
      },
    });

    throw error;
  }
};

export const UserService = {
    createDoctor,
};
