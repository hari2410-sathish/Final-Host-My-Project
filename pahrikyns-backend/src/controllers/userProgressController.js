const prisma = require("../config/prismaClient");

/* ============================================================
   USER MY COURSES
============================================================ */
exports.getMyCourses = async (req, res) => {
  try {
    const courses = await prisma.userCourse.findMany({
      where: { userId: req.user.id },
      include: { course: true }
    });

    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

/* ============================================================
   COURSE PROGRESS
============================================================ */
exports.getCourseProgress = async (req, res) => {
  try {
    const progress = await prisma.progress.findMany({
      where: { userId: req.user.id }
    });

    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch course progress" });
  }
};
