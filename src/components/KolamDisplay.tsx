import { CurvePoint, KolamPattern } from '@/types/kolam';
import { generateSVGPath } from '@/utils/svgPathGenerator';
import React from 'react';

interface KolamDisplayProps {
	pattern: KolamPattern;
	animate?: boolean;
	animationState?: 'stopped' | 'playing' | 'paused';
	animationTiming?: number;
	className?: string;
}

export const KolamDisplay: React.FC<KolamDisplayProps> = ({
	pattern,
	animate = false,
	animationState = 'stopped',
	animationTiming = 150,
	className = '',
}) => {
	const { dimensions, dots, curves, orientation } = pattern;

	const calculatePathLength = (curvePoints?: CurvePoint[]): number => {
		if (!curvePoints || curvePoints.length < 2) return 100;
		let length = 0;
		for (let i = 1; i < curvePoints.length; i++) {
			const dx = curvePoints[i].x - curvePoints[i - 1].x;
			const dy = curvePoints[i].y - curvePoints[i - 1].y;
			length += Math.sqrt(dx * dx + dy * dy);
		}
		return Math.max(length, 50);
	};

	const calculateLineLength = (x1: number, y1: number, x2: number, y2: number): number => {
		const dx = x2 - x1;
		const dy = y2 - y1;
		return Math.sqrt(dx * dx + dy * dy);
	};

	// Diamond orientation: rotate 45° and scale to fit
	const svgStyle: React.CSSProperties = {
		maxWidth: '100%',
		height: 'auto',
		transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
		transform: orientation === 'diamond' ? 'rotate(45deg) scale(0.7)' : 'rotate(0deg) scale(1)',
		transformOrigin: 'center center',
		transformBox: 'fill-box',
		'--animation-duration': `${animationTiming}ms`,
	} as React.CSSProperties;

	return (
		<div className={`kolam-container relative ${className}`} style={{ overflow: 'visible' }}>
			<svg
				width={dimensions.width}
				height={dimensions.height}
				viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
				className="kolam-svg"
				style={svgStyle}
			>
				{/* Dots — L1: full opacity, L2: subtle, L3: faint */}
				{dots.map((dot, index) => {
					const r = dot.radius ?? 3;
					// Derive opacity from radius: 3→1.0, 2→0.6, 1.5→0.3
					const baseOpacity = r >= 3 ? 1 : r >= 2 ? 0.6 : 0.3;
					return (
					<circle
						key={dot.id}
						cx={dot.center.x}
						cy={dot.center.y}
						r={r}
						fill={dot.color || 'white'}
						className={animate && baseOpacity === 1 ? 'kolam-dot-animated' : 'kolam-dot'}
						style={
							animate && baseOpacity === 1
								? {
									animationDelay: `${(index / dots.length) * animationTiming * 0.9}ms`,
									animationDuration: `${animationTiming / dots.length}ms`,
									opacity: 0,
									animationPlayState: animationState === 'paused' ? 'paused' : 'running',
								}
								: { opacity: baseOpacity }
						}
					/>
					);
				})}

				{/* Curves */}
				{curves.map((curve, index) => {
					const lineAnimTime = (animationTiming / curves.length) * 3;
					const curveDelay = (lineAnimTime * index) / 3;

					if (curve.curvePoints && curve.curvePoints.length > 1) {
						const pathLength = calculatePathLength(curve.curvePoints);
						return (
							<path
								key={curve.id}
								d={generateSVGPath(curve.curvePoints)}
								stroke={curve.color || 'white'}
								strokeWidth={curve.strokeWidth || 2}
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
								className={animate ? 'kolam-path-animated' : 'kolam-path'}
								style={
									animate
										? {
											animationDelay: `${curveDelay}ms`,
											animationDuration: `${lineAnimTime}ms`,
											strokeDasharray: `${pathLength}`,
											strokeDashoffset: `${pathLength}`,
											animationPlayState: animationState === 'paused' ? 'paused' : 'running',
										}
										: animationState === 'stopped'
											? { strokeDasharray: 'none', strokeDashoffset: '0', opacity: 1 }
											: {}
								}
							/>
						);
					} else {
						const lineLength = calculateLineLength(curve.start.x, curve.start.y, curve.end.x, curve.end.y);
						return (
							<line
								key={curve.id}
								x1={curve.start.x}
								y1={curve.start.y}
								x2={curve.end.x}
								y2={curve.end.y}
								stroke={curve.color || 'white'}
								strokeWidth={curve.strokeWidth || 2}
								strokeLinecap="round"
								className={animate ? 'kolam-line-animated' : 'kolam-line'}
								style={
									animate
										? {
											animationDelay: `${curveDelay}ms`,
											animationDuration: `${lineAnimTime}ms`,
											strokeDasharray: `${lineLength}`,
											strokeDashoffset: `${lineLength}`,
											animationPlayState: animationState === 'paused' ? 'paused' : 'running',
										}
										: animationState === 'stopped'
											? { strokeDasharray: 'none', strokeDashoffset: '0', opacity: 1 }
											: { opacity: 0 }
								}
							/>
						);
					}
				})}
			</svg>

			{/* CSS for animations */}
			<style jsx>{`
        .kolam-dot-animated {
          animation: fadeIn ease-in-out forwards;
        }

        .kolam-line-animated,
        .kolam-path-animated {
          animation: drawPath ease-in-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes drawPath {
          to { stroke-dashoffset: 0; }
        }

        .kolam-svg {
          filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.1));
        }

        .kolam-path,
        .kolam-line {
          transition: stroke-width 0.2s ease;
        }

        .kolam-path:hover,
        .kolam-line:hover {
          stroke-width: 3;
        }
      `}</style>
		</div>
	);
};
