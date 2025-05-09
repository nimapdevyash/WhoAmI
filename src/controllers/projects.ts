import { Request, Response } from "express";
import Project from "./../models/projects"; 

export async function addProject(req: Request, res: Response) {
  try {
    const { title, tools, description, live_url, github_url } = req.body;

    if (!title || !tools || !description || !live_url || !github_url) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newProject = await Project.create({
      title,
      tools,
      description,
      live_url,
      github_url,
    });

    return res.status(201).json({
      message: "Project added successfully.",
      data: newProject,
    });
  } catch (err: any) {
    return res.status(500).json({ message: "Something went wrong.", error: err.message });
  }
}

export async function updateProject(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { title, tools, description, live_url, github_url } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, tools, description, live_url, github_url },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found." });
    }

    return res.status(200).json({
      message: "Project updated successfully.",
      data: updatedProject,
    });
  } catch (err: any) {
    return res.status(500).json({ message: "Update failed.", error: err.message });
  }
}

export async function getProjects(req: Request, res: Response) {
  try {
    const projects = await Project.find().sort({ createdAt: -1 }).limit(4);

    if (!projects.length) {
      return res.status(404).json({ message: "No projects found." });
    }

    return res.status(200).json({
      message: "Projects fetched successfully.",
      data: projects,
    });
  } catch (err: any) {
    return res.status(500).json({ message: "Fetching failed.", error: err.message });
  }
}
