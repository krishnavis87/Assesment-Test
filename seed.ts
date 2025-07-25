import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.incident.deleteMany();
  await prisma.camera.deleteMany();

  const cameras = await prisma.camera.createMany({
    data: [
      { name: 'Shop Floor A', location: 'Main Floor' },
      { name: 'Vault', location: 'Back Room' },
      { name: 'Entrance', location: 'Front Door' },
    ],
  });

  const allCameras = await prisma.camera.findMany();

  const now = new Date();
  const oneHour = 1000 * 60 * 60;

  const types = ['Unauthorized Access', 'Gun Threat', 'Face Recognised'];

  const incidents = Array.from({ length: 12 }).map((_, i) => {
    const start = new Date(now.getTime() - i * oneHour);
    const end = new Date(start.getTime() + 5 * 60 * 1000);
    return {
      cameraId: allCameras[i % allCameras.length].id,
      type: types[i % types.length],
      tsStart: start,
      tsEnd: end,
      thumbnailUrl: `/thumbnails/thumb${(i % 5) + 1}.jpg`,
      resolved: i % 4 === 0,
    };
  });

  await prisma.incident.createMany({ data: incidents });
}

main().finally(() => prisma.$disconnect());
