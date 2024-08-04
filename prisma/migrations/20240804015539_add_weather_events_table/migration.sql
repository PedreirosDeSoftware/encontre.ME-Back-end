/*
  Warnings:

  - Added the required column `weather_event_id` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "weather_event_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "weather_events" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "weather_events_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_weather_event_id_fkey" FOREIGN KEY ("weather_event_id") REFERENCES "weather_events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
