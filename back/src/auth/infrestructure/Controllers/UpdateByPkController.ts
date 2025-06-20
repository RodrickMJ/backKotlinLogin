import UpdateByPkUseCase from "../../aplication/UpdateByPkUseCase";
import { Request, Response } from "express";

export default class UpdateByPkController {
  constructor(readonly updateByPkUseCase: UpdateByPkUseCase) {}

  async run(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;

    if (!id) {
      return res.status(400).json({
        data: null,
        msg: "User ID is required for this action",
      });
    }

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({
        data: null,
        msg: "At least one field is required to update.",
      });
    }

    const allowedFields = ["name", "email", "password", "rol"];
    const invalidFields = Object.keys(data).filter(
      (key) => !allowedFields.includes(key)
    );

    if (invalidFields.length > 0) {
      return res.status(400).json({
        data: null,
        msg: `Invalid fields: ${invalidFields.join(", ")}`,
      });
    }

    try {
      const result = await this.updateByPkUseCase.run(id, data);

      if (!result) {
        return res.status(404).json({
          data: null,
          msg: "User not found or update failed.",
        });
      }

      return res.status(200).json({
        data: result,
        msg: "User updated successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        data: null,
        msg: "Internal server error",
      });
    }
  }
}
