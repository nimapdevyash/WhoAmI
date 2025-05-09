import { Request, Response } from "express";
import SocialHandles from "./../models/social_handles";

export async function addSocialHandle(req: Request, res: Response) {
  try {
    const { name, url, Svg_logo } = req.body;

    if (!url || !Svg_logo) {
      return res
        .status(400)
        .json({ message: "Both url and Svg_logo are required." });
    }

    const newSocialHandle = await SocialHandles.create({
      name,
      url,
      Svg_logo,
    });

    return res.status(201).json({
      message: "Social handle added successfully.",
      data: newSocialHandle,
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Something went wrong.", error: err.message });
  }
}
export async function updateSocialHandle(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, url, Svg_logo } = req.body;

    const updatedSocialHandle = await SocialHandles.findByIdAndUpdate(
      id,
      { name, url, Svg_logo },
      { new: true }
    );

    if (!updatedSocialHandle) {
      return res.status(404).json({ message: "Social handle not found." });
    }

    return res.status(200).json({
      message: "Social handle updated successfully.",
      data: updatedSocialHandle,
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Update failed.", error: err.message });
  }
}
export async function getSocialHandles(req: Request, res: Response) {
  try {
    const socialHandles = await SocialHandles.find();

    return res.status(200).json({
      message: "Social handles fetched successfully.",
      data: socialHandles,
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Fetching failed.", error: err.message });
  }
}
