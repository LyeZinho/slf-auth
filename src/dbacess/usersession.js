/*
model Session {
  id        String   @id @default(uuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  expiresAt DateTime
  handle    String   @unique
  userId    String
  user      User     @relation(fields: [userId], references: [id])

  // Context
  ip        String?
  userAgent String?

  // Opposite relation field
  @@index([userId], name: "user_sessions")
}

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

class UserSessionRepository {
  constructor() {
    this.prisma = new PrismaClient();
  } 

  async create(sessionData) {
    const session = await this.prisma.session.create({
      data: sessionData,
    });
    return session;
  }

  async findById(id) {
    const session = await this.prisma.session.findUnique({
      where: { id },
      include: { user: true },
    });
    return session;
  }

  async findByHandle(handle) {
    const session = await this.prisma.session.findUnique({
      where: { handle },
      include: { user: true },
    });
    return session;
  }

  async update(id, sessionData) {
    const session = await this.prisma.session.update({
      where: { id },
      data: sessionData,
      include: { user: true },
    });
    return session;
  }

  async delete(id) {
    const session = await this.prisma.session.delete({
      where: { id },
    });
    return session;
  }
}



module.exports = UserSessionRepository;