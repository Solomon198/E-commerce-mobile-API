/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import User from "../Types/user";
import Models from "../models/index";

export default async function HandleRTC(updates: User[]) {
  try {
    const usersModel = Models.Users;

    updates.forEach(async (user) => {
      await usersModel.updateOne(
        { userId: user.userId },
        { location: user.location },
      );
    });
  } catch (e) {
    //
  }
}
