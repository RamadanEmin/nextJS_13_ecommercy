/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    API_URL: "http://localhost:3000",
    DB_URI: "mongodb://localhost:27017/buyitnow",
    NEXTAUTH_SECRET: "codingwithramadan",
    GOOGLE_CLIENT_ID: "599569005945-g8vbdi02a6ulskgfbtnfr9to6o170hi5.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
    GITHUB_ID: "12691ffee5003e8bd08d",
    GITHUB_SECRET: "61a7e56c1e67695da47ee3c63f13099a533a1f09"
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com"
    ]
  },
}

module.exports = nextConfig
