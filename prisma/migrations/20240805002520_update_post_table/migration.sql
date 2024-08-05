/*
  Warnings:

  - You are about to drop the column `weather_event_id` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the `weather_events` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_weather_event_id_fkey";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "weather_event_id";

-- DropTable
DROP TABLE "weather_events";
