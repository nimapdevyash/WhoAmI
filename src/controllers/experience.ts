import { Request, Response } from "express";
import Experience from "./../models/experience"; 

export async function addExperience(req: Request, res: Response) {
  try {
    const { organization, position, start_date, end_date } = req.body;

    if (!organization || !position || !start_date || !end_date) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newExperience = await Experience.create({
      organization,
      position,
      start_date,
      end_date,
    });

    return res.status(201).json({
      message: "Experience added successfully.",
      data: newExperience,
    });
  } catch (err: any) {
    return res.status(500).json({ message: "Something went wrong.", error: err.message });
  }
}

export async function updateExperience(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { organization, position, start_date, end_date } = req.body;

    const updatedExperience = await Experience.findByIdAndUpdate(
      id,
      { organization, position, start_date, end_date },
      { new: true }
    );

    if (!updatedExperience) {
      return res.status(404).json({ message: "Experience not found." });
    }

    return res.status(200).json({
      message: "Experience updated successfully.",
      data: updatedExperience,
    });
  } catch (err: any) {
    return res.status(500).json({ message: "Update failed.", error: err.message });
  }
}

export async function getExperience(req: Request, res: Response) {
  try {
    const experienceEntries = await Experience.find().sort({ createdAt: -1 }).limit(3);

    if (!experienceEntries.length) {
      return res.status(404).json({ message: "No experience records found." });
    }

    return res.status(200).json({
      message: "Experience records fetched successfully.",
      data: experienceEntries,
    });
  } catch (err: any) {
    return res.status(500).json({ message: "Fetching failed.", error: err.message });
  }
}
