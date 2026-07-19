"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import type { ActionResult } from "@/types";

const applicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email address"),
  qualification: z.string().min(2, "Qualification is required"),
  experience: z.number().min(0).max(60),
  subjects: z.array(z.string()).min(1, "At least one subject is required"),
  message: z.string().optional(),
});

export async function submitApplication(data: unknown): Promise<ActionResult> {
  const parsed = applicationSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    await db.facultyApplication.create({
      data: {
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email,
        qualification: parsed.data.qualification,
        experience: parsed.data.experience,
        subjects: parsed.data.subjects,
        message: parsed.data.message ?? null,
        status: "PENDING",
      },
    });

    return { success: true };
  } catch (error) {
    console.error("[Application Submit]", error);
    return { error: "Failed to submit application. Please try again." };
  }
}
