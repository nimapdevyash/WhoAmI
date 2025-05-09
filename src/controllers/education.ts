import { Request, Response } from "express";
import Education from "./../models/education";  

export async function addEducation(req: Request, res: Response) {
  try {
    const { degree_name, collage_name, start_year, end_year } = req.body;

    if (!degree_name || !collage_name || !start_year || !end_year) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newEducation = await Education.create({
      degree_name,
      collage_name,
      start_year,
      end_year,
    });

    return res.status(201).json({
      message: "Education added successfully.",
      data: newEducation,
    });
  } catch (err: any) {
    return res.status(500).json({ message: "Something went wrong.", error: err.message });
  }
}

export async function updateEducation(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { degree_name, collage_name, start_year, end_year } = req.body;

    const updatedEducation = await Education.findByIdAndUpdate(
      id,
      { degree_name, collage_name, start_year, end_year },
      { new: true }
    );

    if (!updatedEducation) {
      return res.status(404).json({ message: "Education not found." });
    }

    return res.status(200).json({
      message: "Education updated successfully.",
      data: updatedEducation,
    });
  } catch (err: any) {
    return res.status(500).json({ message: "Update failed.", error: err.message });
  }
}

export async function getEducation(req: Request, res: Response) {
  try {
    const educationEntries = await Education.find().sort({ createdAt: -1 }).limit(3);

    if (!educationEntries.length) {
      return res.status(404).json({ message: "No education records found." });
    }

    return res.status(200).json({
      message: "Education records fetched successfully.",
      data: educationEntries,
    });
  } catch (err: any) {
    return res.status(500).json({ message: "Fetching failed.", error: err.message });
  }
}
