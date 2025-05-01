-- CreateTable
CREATE TABLE "FeaturedCar" (
    "id" SERIAL NOT NULL,
    "modelUrl" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeaturedCar_pkey" PRIMARY KEY ("id")
);
