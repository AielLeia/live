import db from '@/lib/db';

export const getUserByUsername = async (username: string) => {
  try {
    return await db.user.findUnique({ where: { username } });
  } catch (err) {
    return null;
  }
};
