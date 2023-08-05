/*
model User {
  id        String    @id @default(uuid())
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  userHash  String    @unique
  email     String    @unique
  name      String?

  // Personal info
  firstName String?
  lastName  String?
  avatar    String?
  bio       String?
  profiletheme String?
  pronouns  String?
  username  String?

  // Connection info
  discordId String?
  googleId  String?
  githubId  String?
  twitterId String?

  // Config
  isVerified Boolean @default(false)
  isAdmin    Boolean @default(false)
  isBanned   Boolean @default(false)
  isDeleted  Boolean @default(false)
  isSuspended Boolean @default(false)
  isLocked   Boolean @default(false)
  isPrivate  Boolean @default(false)
  isBeta     Boolean @default(false)
  isPro      Boolean @default(false)
  isPremium  Boolean @default(false)

  // User settings [security]
  twoFactorEnabled Boolean @default(false)
  twoFactorSecret  String?
  twoFactorRecoveryCodes String[]
  twoFactorRecoveryCodesUsed String[]
  twoFactorRecoveryCodesGeneratedAt DateTime?

  // User settings [privacy]
  hideEmail Boolean @default(false)
  hideName  Boolean @default(false)
  hideBio   Boolean @default(false)
  hideAvatar Boolean @default(false)
  hidePronouns Boolean @default(false)
  hideUsername Boolean @default(false)

  // User settings [notifications]
  emailNotifications Boolean @default(false)
  pushNotifications Boolean @default(false)
  smsNotifications  Boolean @default(false)

  // User settings [misc]
  darkMode Boolean @default(false)
  language String? @default("en")
  timezone String? @default("UTC")

  // User settings [social]
  hideFacebook  Boolean @default(false)
  hideTwitter   Boolean @default(false)
  hideInstagram Boolean @default(false)
  hideGithub    Boolean @default(false)
  hideLinkedin  Boolean @default(false)
  
  // Social info
  facebook  String?
  twitter   String?
  instagram String?
  github    String?
  linkedin  String?

  // Opposite relation field
  sessions Session[]
}
*/ 
const { PrismaClient } = require('@prisma/client');

class UserRepository {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async createUser(user) {
        try {
            const createdUser = await this.prisma.user.create({
                data: user,
            });
            return createdUser;
        } catch (error) {
            console.error(error);
            throw new Error('Could not create user');
        }
    }

    async getUserById(id) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id },
            });
            return user;
        } catch (error) {
            console.error(error);
            throw new Error('Could not find user');
        }
    }

    async updateUser(id, data) {
        try {
            const updatedUser = await this.prisma.user.update({
                where: { id },
                data,
            });
            return updatedUser;
        } catch (error) {
            console.error(error);
            throw new Error('Could not update user');
        }
    }

    async deleteUser(id) {
        try {
            const deletedUser = await this.prisma.user.delete({
                where: { id },
            });
            return deletedUser;
        } catch (error) {
            console.error(error);
            throw new Error('Could not delete user');
        }
    }
}

//Test

function test() {
    const userRepo = new UserRepository();

    const user = {
        name: 'Test User',
        email: 'test@email.com',
        userHash: 'testhash',
    };

    userRepo.createUser(user)
        .then((createdUser) => {
            console.log(createdUser);
            return userRepo.getUserById(createdUser.id);
        })
        .then((foundUser) => {
            console.log(foundUser);
            return userRepo.updateUser(foundUser.id, { name: 'Updated User' });
        })
        // .then((updatedUser) => {
        //     console.log(updatedUser);
        //     return userRepo.deleteUser(updatedUser.id);
        // })
        // .then((deletedUser) => {
        //     console.log(deletedUser);
        // })
        .catch((error) => {
            console.error(error);
        }
    );
}

test();

// module.exports = UserRepository;

