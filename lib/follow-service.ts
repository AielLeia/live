import { getSelf } from '@/lib/auth-service';
import db from '@/lib/db';

export const isFollowingUser = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({ where: { id } });
    if (!otherUser) {
      throw new Error('User not found');
    }

    if (otherUser.id === self.id) {
      return true;
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });

    return !!existingFollow;
  } catch (err) {
    return false;
  }
};

export const followUser = async (id: string) => {
  const self = await getSelf();
  const otherUser = await db.user.findUnique({ where: { id } });
  if (!otherUser) {
    throw new Error('User not found');
  }

  if (otherUser.id === self.id) {
    throw new Error('Cannot follow your self');
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (existingFollow) {
    throw new Error('Already following');
  }

  return db.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id,
    },
    include: {
      following: true,
      follower: true,
    },
  });
};

export const unfollowUser = async (id: string) => {
  const self = await getSelf();
  const otherUser = await db.user.findUnique({ where: { id } });
  if (!otherUser) {
    throw new Error('User not found');
  }

  if (otherUser.id === self.id) {
    throw new Error('Cannot unfollow your self');
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (!existingFollow) {
    throw new Error('Not following');
  }

  return db.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      following: true,
    },
  });
};

export const getFollowedUsers = async () => {
  try {
    const self = await getSelf();

    return db.follow.findMany({
      where: {
        followerId: self.id,
        following: { blocking: { none: { blockedId: self.id } } },
      },
      include: {
        following: { include: { stream: { select: { isLive: true } } } },
      },
    });
  } catch (err) {
    return [];
  }
};
