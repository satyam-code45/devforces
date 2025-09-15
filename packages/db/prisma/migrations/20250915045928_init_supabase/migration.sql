/*
  Warnings:

  - You are about to drop the column `contestToChallengeMappingId` on the `Submission` table. All the data in the column will be lost.
  - Added the required column `cahllengeId` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Submission" DROP CONSTRAINT "Submission_contestToChallengeMappingId_fkey";

-- AlterTable
ALTER TABLE "public"."Submission" DROP COLUMN "contestToChallengeMappingId",
ADD COLUMN     "cahllengeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."ContestSubmission" (
    "id" TEXT NOT NULL,
    "submission" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "contestId" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contestToChallengeMappingId" TEXT NOT NULL,

    CONSTRAINT "ContestSubmission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ContestSubmission" ADD CONSTRAINT "ContestSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ContestSubmission" ADD CONSTRAINT "ContestSubmission_contestToChallengeMappingId_fkey" FOREIGN KEY ("contestToChallengeMappingId") REFERENCES "public"."ContestToChallengeMapping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Submission" ADD CONSTRAINT "Submission_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "public"."Challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
