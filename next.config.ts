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
		],
	},
};

export default nextConfig;