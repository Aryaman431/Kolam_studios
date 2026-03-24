interface FooterProps {
	className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
	return (
		<footer className={`relative border-t border-[color:var(--border-soft)] py-12 md:py-16 ${className}`}>
			{/* Decorative elements */}
			<div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[rgba(255,255,255,0.02)] to-transparent" />

			<div className="relative mx-auto max-w-6xl px-6 md:px-8">
				<div className="space-y-8">
					{/* Main footer content */}
					<div className="text-center space-y-4">
						<p className="font-display text-amp tracking-[0.25em] text-[var(--ink)]/40 text-sm md:text-base">
							Kolam Art Studios
						</p>
						<p className="text-xs tracking-wide text-[var(--ink)]/35 max-w-2xl mx-auto leading-relaxed">
							Celebrating the mathematical beauty and spiritual tradition of South Indian geometric art. Creating, exploring, and sharing kolam designs for the modern age.
						</p>
					</div>

					{/* Divider */}
					<div className="h-px bg-gradient-to-r from-transparent via-[rgba(212,218,226,0.1)] to-transparent" />

					{/* Bottom info */}
					<div className="flex flex-col md:flex-row items-center justify-center gap-6 text-xs text-[var(--ink)]/30">
						<span>© 2024 Kolam Art Studios</span>
						<span className="hidden md:inline">•</span>
						<span>Inspired by Indian Heritage</span>
					</div>
				</div>
			</div>
		</footer>
	);
};
