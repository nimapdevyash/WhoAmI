import { Request, Response } from "express";
import Skills from "./../models/skills";

export async function addSkill(req: Request, res: Response) {
  try {
    const { name, Svg_logo } = req.body;

    if (!name || !Svg_logo) {
      return res
        .status(400)
        .json({ message: "Both name and Svg_logo are required." });
    }

    const newSkill = await Skills.create({
      name,
      Svg_logo,
    });

    return res.status(201).json({
      message: "Skill added successfully.",
      data: newSkill,
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Something went wrong.", error: err.message });
  }
}
export async function updateSkill(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, Svg_logo } = req.body;

    const updatedSkill = await Skills.findByIdAndUpdate(
      id,
      { name, Svg_logo },
      { new: true }
    );

    if (!updatedSkill) {
      return res.status(404).json({ message: "Skill not found." });
    }

    return res.status(200).json({
      message: "Skill updated successfully.",
      data: updatedSkill,
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Update failed.", error: err.message });
  }
}
export async function getSkills(req: Request, res: Response) {
  try {
    const skills = await Skills.find();

    return res.status(200).json({
      message: "Skills fetched successfully.",
      data: skills,
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Fetching failed.", error: err.message });
  }
}
