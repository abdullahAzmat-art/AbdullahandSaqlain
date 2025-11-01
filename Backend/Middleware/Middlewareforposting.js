export const creatorMiddleware = (req, res, next) => {
  if (req.user.role !== "creator") {
    return res.status(403).json({ msg: "Only creators can post jobs" });
  }
  next();
};

export const seekerMiddleware = (req, res, next) => {
  if (req.user.role !== "seeker") {
    return res.status(403).json({ msg: "Only seekers can apply for jobs" });
  }
  next();
};
