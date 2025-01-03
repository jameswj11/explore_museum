import User from "./user.js";

async function saveArt(currentUser, art) {
  try {
    const user = await User.findOne({ username: currentUser.username });

    if (!user) {
      return null;
    }

    // return if object already is saved
    if (user.favorites.some(e => e.desc === art.desc)) {
      return;
    }

    user.favorites.push(art);

    await user.save();

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteArt(currentUser, art) {
  try {
    const user = await User.findOne({ username: currentUser.username });

    if (!user) {
      return null;
    }

    const index = user.favorites.indexOf(art);
    user.favorites.splice(index, 1);

    await user.save();

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { saveArt, deleteArt };
