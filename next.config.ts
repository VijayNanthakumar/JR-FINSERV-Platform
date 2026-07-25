import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	serverExternalPackages: ["@prisma/client", "better-auth", "firebase"],
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "laalcoooxkednvxvnfln.supabase.co",
				pathname: "/storage/v1/object/public/**",
			},
			{
				protocol: "https",
				hostname: "img.youtube.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "i.ytimg.com",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;