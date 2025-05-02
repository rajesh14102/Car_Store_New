-- Product Table
CREATE TABLE "Product" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "price" DOUBLE PRECISION NOT NULL,
  "modelUrl" TEXT NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- FeaturedCar Table
CREATE TABLE "FeaturedCar" (
  "id" SERIAL PRIMARY KEY,
  "modelUrl" TEXT NOT NULL,
  "uploadedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);