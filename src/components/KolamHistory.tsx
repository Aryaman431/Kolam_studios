export const KolamHistory: React.FC = () => {
	return (
		<section className="relative border-t border-[color:var(--border-soft)] bg-gradient-to-b from-[rgba(18,18,20,0.5)] via-[rgba(30,30,36,0.3)] to-transparent py-16 md:py-24">
			{/* Decorative background dots */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<svg className="absolute right-0 top-0 h-96 w-96 opacity-[0.05]" viewBox="0 0 200 200">
					<circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" />
					<circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" />
					<circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
					<circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
				</svg>
				<svg className="absolute bottom-0 left-0 h-80 w-80 opacity-[0.04]" viewBox="0 0 200 200">
					<path d="M 100 20 L 180 50 L 160 130 L 40 130 L 20 50 Z" fill="none" stroke="currentColor" strokeWidth="1" />
					<path d="M 100 50 L 150 70 L 140 110 L 60 110 L 50 70 Z" fill="none" stroke="currentColor" strokeWidth="1" />
				</svg>
			</div>

			<div className="relative mx-auto max-w-3xl px-6 md:px-8">
				<div className="space-y-12">
					{/* Title and intro */}
					<div className="space-y-4 text-center">
						<h2 className="font-display text-2xl font-normal tracking-[-0.02em] text-[var(--accent-bright)] md:text-3xl">
							The Art of Kolam
						</h2>
						<p className="mx-auto max-w-xl text-[14px] leading-relaxed text-[var(--ink)]/60">
							An ancient tradition woven into the cultural fabric of South India
						</p>
					</div>

					{/* Content sections */}
					<div className="space-y-8">
						{/* Origins */}
						<div className="space-y-3 rounded-lg border border-[color:var(--border-soft)] bg-[rgba(255,255,255,0.02)] px-5 py-6 backdrop-blur-sm">
							<h3 className="text-sm font-semibold tracking-wide text-[var(--accent)]">Origins & Significance</h3>
							<p className="text-[13px] leading-relaxed text-[var(--ink)]/50">
								Kolam, also known as <span className="text-[var(--accent-muted)]">rangoli</span> in other parts of India, traces its
								origins back to ancient Tamil Nadu and Karnataka. These intricate geometric patterns are believed to have sacred origins,
								with historical references found in the Sangam literature dating back over 2,000 years. Traditionally drawn during auspicious
								occasions, especially{' '}
								<span className="text-[var(--accent-muted)]">Pongal</span> and <span className="text-[var(--accent-muted)]">Diwali</span>,
								kolams symbolize prosperity, good fortune, and the welcoming of divine blessings into homes and communities.
							</p>
						</div>

						{/* Artistic tradition */}
						<div className="space-y-3 rounded-lg border border-[color:var(--border-soft)] bg-[rgba(255,255,255,0.02)] px-5 py-6 backdrop-blur-sm">
							<h3 className="text-sm font-semibold tracking-wide text-[var(--accent)]">The Artistic Tradition</h3>
							<p className="text-[13px] leading-relaxed text-[var(--ink)]/50">
								Traditionally created by women of all ages, kolams represent a remarkable blend of mathematics, art, and spirituality. The
								patterns are drawn on the ground using rice flour, colored powders, or flower petals. Each design is meticulously planned yet
								created freehand, demonstrating extraordinary skill and precision. The act of creating a kolam is meditative—a daily ritual
								that begins before dawn, with women creating fresh patterns that beautify and sanctify their surroundings.
							</p>
						</div>

						{/* Patterns and symbolism */}
						<div className="space-y-3 rounded-lg border border-[color:var(--border-soft)] bg-[rgba(255,255,255,0.02)] px-5 py-6 backdrop-blur-sm">
							<h3 className="text-sm font-semibold tracking-wide text-[var(--accent)]">Pattern Mathematics</h3>
							<p className="text-[13px] leading-relaxed text-[var(--ink)]/50">
								Kolam designs are rooted in geometric principles and mathematical symmetry. Common patterns include the
								<span className="text-[var(--accent-muted)]"> pulli kolam </span> (dot patterns), which form the foundation for more complex
								designs. These dot-based patterns create intricate interlaced lines that form mandalas, flowers, and abstract geometries.
								The dimensions and proportions follow precise rules, creating harmonious and balanced compositions that are both visually
								stunning and mathematically elegant.
							</p>
						</div>

						{/* Cultural significance */}
						<div className="space-y-3 rounded-lg border border-[color:var(--border-soft)] bg-[rgba(255,255,255,0.02)] px-5 py-6 backdrop-blur-sm">
							<h3 className="text-sm font-semibold tracking-wide text-[var(--accent)]">Cultural Heritage</h3>
							<p className="text-[13px] leading-relaxed text-[var(--ink)]/50">
								In Tamil Nadu, kolams are not merely decorative—they are integral to the daily lives of communities. Every home, temple, and
								public space displays kolams as expressions of cultural identity and spiritual devotion. The practice connects generations,
								with mothers teaching daughters the intricate techniques passed down through centuries. Today, kolams have transcended
								geographic boundaries, gaining recognition as a UNESCO-listed Intangible Cultural Heritage of Humanity, celebrating India&apos;s
								rich artistic and spiritual legacy.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
