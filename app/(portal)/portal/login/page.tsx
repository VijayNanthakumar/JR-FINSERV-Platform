"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function PortalLoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const { data, error: authError } = await supabase.auth.signInWithPassword({
				email: email.trim(),
				password,
			});

			if (authError) {
				setError(authError.message);
				setLoading(false);
				return;
			}

			if (data.session) {
				// Set cookies for middleware auth verification
				const maxAge = data.session.expires_in || 3600;
				document.cookie = `sb-access-token=${data.session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax`;
				document.cookie = `sb-refresh-token=${data.session.refresh_token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;

				router.push("/portal/dashboard");
			}
		} catch {
			setError("An unexpected error occurred. Please try again.");
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-neutral-50 px-4">
			<div className="w-full max-w-sm">
				{/* Branding */}
				<div className="text-center mb-8">
					<h1 className="text-xl font-semibold text-navy-800 font-body tracking-wide">
						JR FINSERV
					</h1>
					<p className="text-xs text-neutral-500 mt-1 font-body">
						Admin Portal
					</p>
				</div>

				{/* Login Card */}
				<div className="bg-white border border-neutral-200 rounded-xl p-6">
					<h2 className="text-sm font-semibold text-neutral-900 mb-5 font-body">
						Sign in to your account
					</h2>

					<form onSubmit={handleLogin} className="space-y-4">
						{/* Email */}
						<div>
							<label
								htmlFor="email"
								className="block text-xs font-medium text-neutral-700 mb-1.5 font-body"
							>
								Email
							</label>
							<input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								autoComplete="email"
								autoFocus
								placeholder="admin@jrfinserv.com"
								className="w-full h-10 px-3 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 placeholder:text-neutral-400 font-body focus:outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800 transition-colors"
							/>
						</div>

						{/* Password */}
						<div>
							<label
								htmlFor="password"
								className="block text-xs font-medium text-neutral-700 mb-1.5 font-body"
							>
								Password
							</label>
							<div className="relative">
								<input
									id="password"
									type={showPassword ? "text" : "password"}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									autoComplete="current-password"
									placeholder="••••••••"
									className="w-full h-10 px-3 pr-10 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 placeholder:text-neutral-400 font-body focus:outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800 transition-colors"
								/>
								<button
									type="button"
									onClick={() => setShowPassword((prev) => !prev)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
									aria-label={showPassword ? "Hide password" : "Show password"}
								>
									{showPassword ? (
										<EyeOff className="h-4 w-4" />
									) : (
										<Eye className="h-4 w-4" />
									)}
								</button>
							</div>
						</div>

						{/* Error */}
						{error && (
							<p className="text-xs text-red-600 font-body bg-red-50 border border-red-100 rounded-lg px-3 py-2">
								{error}
							</p>
						)}

						{/* Submit */}
						<button
							type="submit"
							disabled={loading}
							className="w-full h-10 bg-navy-800 text-white text-sm font-medium rounded-lg hover:bg-navy-900 disabled:opacity-60 disabled:cursor-not-allowed transition-colors font-body flex items-center justify-center"
						>
							{loading ? (
								<Loader2 className="h-4 w-4 animate-spin" />
							) : (
								"Sign in"
							)}
						</button>
					</form>
				</div>

				<p className="text-center text-[11px] text-neutral-400 mt-6 font-body">
					Authorized personnel only
				</p>
			</div>
		</div>
	);
}
