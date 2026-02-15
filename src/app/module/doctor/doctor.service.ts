import { prisma } from "../../lib/prisma";
import { IUpdateDoctorPayload } from "./doctor.interface";

const getAllDoctors = async () => {
    const doctors = await prisma.doctor.findMany({
        include: {
            user: true,
            specialities: {
                include: {
                    speciality: true,
                },
            },
        },
    });

    return doctors;
};

const getDoctorById = async (id: string) => {
    const doctor = await prisma.doctor.findUnique({
        where: {
            id,
        },
        include: {
            user: true,
            specialities: {
                include: {
                    speciality: true,
                },
            },
        },
    });

    if (!doctor) {
        throw new Error("Doctor not found");
    }

    return doctor;
};

const updateDoctor = async (
    id: string,
    payload: IUpdateDoctorPayload
) => {
    const doctorExists = await prisma.doctor.findUnique({
        where: { id },
    });

    if (!doctorExists) {
        throw new Error("Doctor not found");
    }

    const updatedDoctor = await prisma.doctor.update({
        where: { id },
        data: {
            ...payload,
        },
        include: {
            user: true,
            specialities: {
                include: {
                    speciality: true,
                },
            },
        },
    });

    return updatedDoctor;
};

const deleteDoctor = async (id: string) => {
    const doctorExists = await prisma.doctor.findUnique({
        where: { id },
        include: {
            user: true,
        },
    });

    if (!doctorExists) {
        throw new Error("Doctor not found");
    }

    const result = await prisma.$transaction(async (tx) => {
        // Soft delete user
        const deletedUser = await tx.user.update({
            where: {
                id: doctorExists.userId,
            },
            data: {
                isDeleted: true,
                deletedAt: new Date(),
            },
        });

        // Optional: you can also mark doctor table deleted if you have those fields
        // If doctor table does NOT have isDeleted field, leave it like this.

        return deletedUser;
    });

    return result;
};

export const DoctorsService = {
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
};
