export const GeometricBackground: React.FC = () => {
	return (
		<svg
			className="pointer-events-none fixed inset-0 -z-10 opacity-[0.03]"
			width="100%"
			height="100%"
			viewBox="0 0 1200 1200"
			preserveAspectRatio="xMidYMid slice"
		>
			{/* Diamond patterns */}
			<defs>
				<pattern id="diamond-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
					<polygon points="60,0 120,60 60,120 0,60" fill="none" stroke="currentColor" strokeWidth="0.5" />
					<polygon points="60,20 100,60 60,100 20,60" fill="none" stroke="currentColor" strokeWidth="0.3" />
				</pattern>

				<pattern id="grid-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
					<path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5" />
					<circle cx="40" cy="40" r="2" fill="currentColor" opacity="0.5" />
				</pattern>

				<pattern id="dots-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
					<circle cx="50" cy="50" r="3" fill="currentColor" opacity="0.3" />
					<circle cx="20" cy="20" r="1.5" fill="currentColor" opacity="0.4" />
					<circle cx="80" cy="80" r="1.5" fill="currentColor" opacity="0.4" />
				</pattern>

				<pattern id="star-pattern" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
					<polygon
						points="75,10 90,50 135,50 105,75 120,115 75,90 30,115 45,75 15,50 60,50"
						fill="none"
						stroke="currentColor"
						strokeWidth="0.5"
						opacity="0.4"
					/>
				</pattern>
			</defs>

			{/* Top left diamond pattern */}
			<rect x="0" y="0" width="800" height="600" fill="url(#diamond-pattern)" />

			{/* Bottom right grid pattern */}
			<rect x="400" y="600" width="800" height="600" fill="url(#grid-pattern)" />

			{/* Center dots pattern */}
			<rect x="200" y="300" width="800" height="600" fill="url(#dots-pattern)" />

			{/* Corner stars */}
			<rect x="0" y="0" width="300" height="300" fill="url(#star-pattern)" opacity="0.5" />
			<rect x="900" y="900" width="300" height="300" fill="url(#star-pattern)" opacity="0.5" />
		</svg>
	);
};
