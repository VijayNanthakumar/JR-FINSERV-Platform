"use client";

import Image from "next/image";
import {
	Monitor,
	Smartphone,
	CheckCircle2,
	ExternalLink,
	HelpCircle,
	RotateCcw,
} from "lucide-react";

const PORTAL_URL = "https://jrassociates.themfbox.com";
const FORGOT_PASSWORD_URL = "https://jrassociates.themfbox.com/forgot-password";
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=in.mymfbox";
const APP_STORE_URL = "https://apps.apple.com/sg/app/themfbox/id1594370380";

const checklist = [
	"View your mutual fund investments",
	"Track your portfolio",
	"Access investment-related information",
	"Manage your investor account",
];

export function InvestorPortalSection() {
	return (
		<section
			id="investor-portal"
			className="py-16 sm:py-20 md:py-28 bg-neutral-50 border-b border-neutral-200 overflow-hidden"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">

				{/* ── Section Heading ──────────────────────────────────── */}
				<div className="flex flex-col items-center text-center gap-4">
					{/* Eyebrow with decorative lines */}
					<div className="flex items-center gap-4">
						<span className="hidden sm:block h-px w-10 bg-blue-400/60" />
						<span className="text-xs font-bold uppercase tracking-widest text-blue-600">
							Existing Investors
						</span>
						<span className="hidden sm:block h-px w-10 bg-blue-400/60" />
					</div>

					{/* Main heading — navy + blue highlight */}
					<h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-navy-900">
						Your Investments. Always Within Reach.
					</h2>

					<p className="text-sm sm:text-base text-neutral-500 max-w-lg font-body leading-relaxed">
						Access your mutual fund portfolio anytime, anywhere through our
						investor portal or mobile application.
					</p>
				</div>

				{/* ── Two Main Cards ────────────────────────────────────── */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

					{/* Left Card — Investor Portal */}
					<div className="flex flex-col gap-6 bg-white border border-neutral-200/60 rounded-2xl p-6 md:p-8 shadow-sm">
						{/* Icon + eyebrow */}
						<div className="flex items-center gap-4">
							<div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
								<Monitor className="h-6 w-6 text-blue-600" />
							</div>
							<span className="text-xs font-bold uppercase tracking-widest text-blue-600">
								Investor Portal
							</span>
						</div>

						{/* Card heading + description */}
						<div className="flex flex-col gap-2">
							<h3 className="font-display text-2xl md:text-3xl font-bold text-navy-900 leading-tight">
								Manage Your Investments Online
							</h3>
							<p className="text-sm text-neutral-500 leading-relaxed">
								Access your mutual fund portfolio through our secure investor
								portal.
							</p>
						</div>

						{/* Checklist */}
						<ul className="flex flex-col gap-3">
							{checklist.map((item) => (
								<li key={item} className="flex items-center gap-3 text-sm text-neutral-600 font-body">
									<CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0" />
									{item}
								</li>
							))}
						</ul>

						{/* Login button */}
						<a
							href={PORTAL_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="mt-auto flex items-center justify-center gap-2.5 w-full bg-blue-700 hover:bg-blue-600 active:scale-[0.98] transition-all text-white font-semibold text-sm rounded-xl px-6 py-3.5 shadow-sm"
						>
							Login to Investor Portal
							<ExternalLink className="h-4 w-4" />
						</a>
					</div>

					{/* Right Card — Mobile App */}
					<div className="relative flex flex-col gap-6 bg-white border border-neutral-200/60 rounded-2xl p-6 md:p-8 shadow-sm overflow-hidden">
						{/* Icon + eyebrow */}
						<div className="flex items-center gap-4">
							<div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
								<Smartphone className="h-6 w-6 text-emerald-600" />
							</div>
							<span className="text-xs font-bold uppercase tracking-widest text-blue-600">
								theMFbox Mobile App
							</span>
						</div>

						{/* Content row: text+badges left, phone right */}
						<div className="flex items-end gap-4">
							{/* Left: heading, description, badges */}
							<div className="flex flex-col gap-5 flex-1 min-w-0">
								<div className="flex flex-col gap-2">
									<h3 className="font-display text-2xl md:text-3xl font-bold text-navy-900 leading-tight">
										Your Portfolio on Your Phone
									</h3>
									<p className="text-sm text-neutral-500 leading-relaxed">
										Access your investments conveniently using the theMFbox
										mobile application.
									</p>
								</div>

								{/* Store badges — stacked vertically */}
								<div className="flex flex-col gap-3">
									<a
										href={GOOGLE_PLAY_URL}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-block transition-opacity hover:opacity-90 active:opacity-75"
										aria-label="Get it on Google Play"
									>
										<Image
											src="/images/investor/google-play.png"
											alt="Get it on Google Play"
											width={180}
											height={54}
											className="h-[50px] w-auto object-contain"
										/>
									</a>
									<a
										href={APP_STORE_URL}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-block transition-opacity hover:opacity-90 active:opacity-75"
										aria-label="Download on the App Store"
									>
										<Image
											src="/images/investor/app-store.png"
											alt="Download on the App Store"
											width={180}
											height={54}
											className="h-[50px] w-auto object-contain"
										/>
									</a>
								</div>
							</div>

							{/* Right: Phone mockup */}
							<div className="shrink-0 self-end">
								<Image
									src="/images/investor/themfbox-phone.png"
									alt="theMFbox app on phone"
									width={200}
									height={380}
									className="h-[200px] sm:h-[240px] md:h-[280px] w-auto object-contain drop-shadow-xl"
								/>
							</div>
						</div>
					</div>
				</div>

				{/* ── Account Help Card ─────────────────────────────────── */}
				<div className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 shadow-sm">
					<div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
						{/* Left: icon + text */}
						<div className="flex items-start gap-4 flex-1 min-w-0">
							<div className="h-12 w-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
								<HelpCircle className="h-6 w-6 text-orange-500" />
							</div>
							<div className="flex flex-col gap-1 min-w-0">
								<h4 className="font-display text-base md:text-lg font-bold text-navy-900">
									Need help accessing your account?
								</h4>
								<p className="text-sm text-neutral-500 leading-relaxed">
									Your login ID is generally your registered PAN or mobile
									number, as provided in your account instructions.
								</p>
							</div>
						</div>

						{/* Vertical divider (desktop only) */}
						<div className="hidden sm:block self-stretch w-px bg-neutral-200 mx-2" />

						{/* Right: button + support text */}
						<div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
							<a
								href={FORGOT_PASSWORD_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 border border-blue-700 text-blue-700 hover:bg-blue-50 active:scale-[0.98] transition-all font-semibold text-sm rounded-xl px-5 py-2.5"
							>
								<RotateCcw className="h-4 w-4" />
								Reset Password
								<ExternalLink className="h-3.5 w-3.5 opacity-70" />
							</a>
							<p className="text-xs text-neutral-500 font-body text-center sm:text-right">
								For assistance with login credentials, please contact JR FINSERV.
							</p>
						</div>
					</div>
				</div>

			</div>
		</section>
	);
}
