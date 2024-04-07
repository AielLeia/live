import db from '@/lib/db';

export const getUserByUsername = async (username: string) => {
  try {
    return await db.user.findUnique({
      where: { username },
      include: { stream: true, _count: { select: { followedBy: true } } },
    });
  } catch (err) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    return await db.user.findUnique({
      where: { id },
      include: { stream: true },
    });
  } catch (err) {
    return null;
  }
};
