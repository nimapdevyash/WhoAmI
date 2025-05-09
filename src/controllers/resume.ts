import { Request, Response } from "express";
import Resume from "./../models/resume"; 

export async function addResume(req: Request, res: Response) {
  try {
    const { name, url } = req.body;

    if (!url) {
      return res.status(400).json({ message: "URL is required." });
    }

    const newResume = await Resume.create({
      name,
      url,
    });

    return res.status(201).json({
      message: "Resume added successfully.",
      data: newResume,
    });
  } catch (err: any) {
    return res.status(500).json({ message: "Something went wrong.", error: err.message });
  }
}

export async function updateResume(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, url } = req.body;

    const updatedResume = await Resume.findByIdAndUpdate(
      id,
      { name, url },
      { new: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found." });
    }

    return res.status(200).json({
      message: "Resume updated successfully.",
      data: updatedResume,
    });
  } catch (err: any) {
    return res.status(500).json({ message: "Update failed.", error: err.message });
  }
}
export async function getResume(req: Request, res: Response) {
  try {
    const resume = await Resume.find().sort({ createdAt: -1 }).limit(1);

    if (!resume.length) {
      return res.status(404).json({ message: "No resume found." });
    }

    return res.status(200).json({
      message: "Resume fetched successfully.",
      data: resume[0], 
    });
  } catch (err: any) {
    return res.status(500).json({ message: "Fetching failed.", error: err.message });
  }
}
