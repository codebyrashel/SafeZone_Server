import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../lib/prisma";
import { IUpdateDoctorPayload } from "./doctor.interface";

const getAllDoctors = async () => {
    const doctors = await prisma.doctor.findMany({
        where: {
            isDeleted: false,
        },
        include: {
            user: true,
            specialities: {
                include: {
                    speciality: true
                }
            }
        }
    })
    return doctors;
};

const getDoctorById = async (id: string) => {
const doctor = await prisma.doctor.findUnique({
        where: {
            id,
            isDeleted: false,
        },
        include: {
            user: true,
            specialities: {
                include: {
                    speciality: true
                }
            },
            appointments: {
                include: {
                    patient: true,
                    schedule: true,
                    prescription: true,
                }
            },
            doctorSchedules: {
                include: {
                    schedule: true,
                }
            },
            reviews: true
        }
    })

    if (!doctor) {
        throw new Error("Doctor not found");
    }

    return doctor;
};

const updateDoctor = async (id: string, payload: IUpdateDoctorPayload) => {
    const isDoctorExist = await prisma.doctor.findUnique({
        where: {
            id,
        }
    })

    if (!isDoctorExist) {
        throw new AppError(status.NOT_FOUND, "Doctor not found");
    }

    const { doctor: doctorData, specialities } = payload;

    await prisma.$transaction(async (tx) => {
        if (doctorData) {
            await tx.doctor.update({
                where: {
                    id,
                },
                data: {
                    ...doctorData,
                }
            })
        }

        if (specialities && specialities.length > 0) {
            for (const specialty of specialities) {
                const { specialityId, shouldDelete } = specialty;
                if (shouldDelete) {
                    await tx.doctorSpeciality.delete({
                        where: {
                            doctorId_specialityId: {
                                doctorId: id,
                                specialityId,
                            }
                        }
                    })
                } else {
                    await tx.doctorSpeciality.upsert({
                        where: {
                            doctorId_specialityId: {
                                doctorId: id,
                                specialityId,
                            }
                        },
                        create: {
                            doctorId: id,
                            specialityId,
                        },
                        update: {}
                    })
                }
            }
        }
    })

    const doctor = await getDoctorById(id);

    return doctor;
}

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
