-- Enum for User Roles
CREATE TYPE UserRole AS ENUM ('ADMIN', 'USER', 'GUEST');

-- User Table
CREATE TABLE User (
  id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  emailVerified TIMESTAMP,
  image VARCHAR(255),
  password VARCHAR(255),
  role UserRole DEFAULT 'USER',
  isTwoFactorEnabled BOOLEAN DEFAULT FALSE,
  twoFactorConfirmationId VARCHAR(36),
  FOREIGN KEY (twoFactorConfirmationId) REFERENCES TwoFactorConfirmation(id) ON DELETE CASCADE
);

-- Account Table
CREATE TABLE Account (
  id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
  userId VARCHAR(36) NOT NULL,
  type VARCHAR(50),
  provider VARCHAR(50),
  providerAccountId VARCHAR(50),
  refresh_token TEXT,
  access_token TEXT,
  expires_at INTEGER,
  token_type VARCHAR(50),
  scope VARCHAR(255),
  id_token TEXT,
  session_state VARCHAR(255),
  UNIQUE (provider, providerAccountId),
  FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
);

-- VerificationToken Table
CREATE TABLE VerificationToken (
  id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255),
  token VARCHAR(255) UNIQUE,
  expires TIMESTAMP,
  UNIQUE (email, token)
);

-- PasswordResetToken Table
CREATE TABLE PasswordResetToken (
  id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255),
  token VARCHAR(255) UNIQUE,
  expires TIMESTAMP,
  UNIQUE (email, token)
);

-- TwoFactorToken Table
CREATE TABLE TwoFactorToken (
  id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255),
  token VARCHAR(255) UNIQUE,
  expires TIMESTAMP,
  UNIQUE (email, token)
);

-- TwoFactorConfirmation Table
CREATE TABLE TwoFactorConfirmation (
  id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
  userId VARCHAR(36) NOT NULL UNIQUE,
  FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
);
