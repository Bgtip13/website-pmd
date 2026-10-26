import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Host preview tambahan untuk `next dev` diatur lewat env agar tidak
  // menulis hostname lingkungan ke dalam repo. Tidak berpengaruh di production.
  allowedDevOrigins: (process.env.NEXT_DEV_ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
};

export default nextConfig;
