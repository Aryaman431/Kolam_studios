import Link from 'next/link';

interface HeaderProps {
	title: string;
	subtitle?: string;
	showBackButton?: boolean;
	backButtonHref?: string;
	backButtonText?: string;
	className?: string;
}

export const Header: React.FC<HeaderProps> = ({
	title,
	subtitle,
	showBackButton = false,
	backButtonHref = '/',
	backButtonText = 'Back',
	className = '',
}) => {
	return (
		<header className={`relative overflow-hidden ${className}`}>
			{/* Decorative geometric elements */}
			<div className="pointer-events-none absolute inset-0">
				{/* Top right accent circle */}
				<svg className="absolute -right-40 -top-40 h-80 w-80 opacity-[0.05]" viewBox="0 0 200 200">
					<circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" />
					<circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" />
					<circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
				</svg>
				{/* Bottom left diamond pattern */}
				<svg className="absolute -bottom-32 -left-32 h-96 w-96 opacity-[0.04]" viewBox="0 0 200 200">
					<polygon points="100,20 180,100 100,180 20,100" fill="none" stroke="currentColor" strokeWidth="1" />
					<polygon points="100,50 150,100 100,150 50,100" fill="none" stroke="currentColor" strokeWidth="1" />
				</svg>
			</div>

			<div className="relative mx-auto max-w-3xl px-6 pb-12 pt-10 md:px-8 md:pb-14 md:pt-12">
				{showBackButton && (
					<Link
						href={backButtonHref}
						className="mb-8 inline-flex items-center gap-2 text-[13px] font-medium text-[var(--accent-muted)] transition hover:text-[var(--accent-bright)]"
					>
						<span className="text-[var(--ink)]/50" aria-hidden>
							←
						</span>
						{backButtonText.replace(/^[←\s]+/, '')}
					</Link>
				)}

				<div className="space-y-6">
					<div className="space-y-4 text-center">
						<h1 className="font-display text-center text-[2.5rem] font-normal leading-[1.2] tracking-[-0.02em] text-[var(--accent-bright)] md:text-[3.5rem]">
							{title}
						</h1>
						{subtitle && (
							<p className="mx-auto max-w-2xl text-center text-[14px] leading-relaxed text-[var(--ink)]/55 md:mt-2 md:text-[15px]">
								{subtitle}
							</p>
						)}
					</div>

					{/* Decorative line */}
					<div className="flex items-center justify-center gap-4">
						<div className="h-px flex-grow bg-gradient-to-r from-transparent via-[rgba(212,218,226,0.15)] to-transparent" />
						<div className="flex gap-1">
							<div className="h-1 w-1 rounded-full bg-[var(--accent-muted)]/40" />
							<div className="h-1 w-1 rounded-full bg-[var(--accent-muted)]/60" />
							<div className="h-1 w-1 rounded-full bg-[var(--accent-muted)]/40" />
						</div>
						<div className="h-px flex-grow bg-gradient-to-r from-transparent via-[rgba(212,218,226,0.15)] to-transparent" />
					</div>
				</div>
			</div>

			<div
				className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[rgba(228,231,236,0.15)] to-transparent"
				aria-hidden
			/>
		</header>
	);
};
