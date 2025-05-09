import { Request, Response } from "express";
import Contacts from "./../models/contact_info";

export async function addContacts(req: Request, res: Response) {
  try {
    const { name, email, mobile_number, address } = req.body;

    if (!name || !email || !mobile_number || !address) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newContact = await Contacts.create({
      name,
      email,
      mobile_number,
      address,
    });

    return res.status(201).json({ message: "Contact added successfully.", data: newContact });
  } catch (err: any) {
    return res.status(500).json({ message: "Something went wrong.", error: err.message });
  }
}

export async function updateContact(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, email, mobile_number, address } = req.body;

    const updated = await Contacts.findByIdAndUpdate(
      id,
      { name, email, mobile_number, address },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Contact not found." });
    }

    return res.status(200).json({
      message: "Contact updated successfully.",
      data: updated,
    });
  } catch (err: any) {
    return res.status(500).json({ message: "Update failed.", error: err.message });
  }
}

export async function getContacts(req: Request, res: Response) {
  try {
    const contact = await Contacts.findOne().sort({ createdAt: -1 }).limit(1); 

    if (!contact) {
      return res.status(404).json({ message: "No contacts found." });
    }

    return res.status(200).json({
      message: "Contact fetched successfully.",
      data: contact,
    });
  } catch (err: any) {
    return res.status(500).json({ message: "Fetching failed.", error: err.message });
  }
}

