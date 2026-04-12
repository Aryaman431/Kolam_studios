import { CurvePoint } from '@/types/kolam';

/**
 * Generate SVG path string from curve points using quadratic Bezier curves.
 * All Kolam patterns (levels 1–3) use the same 16 traditional curve patterns,
 * so all curvePoints arrays carry explicit control points from the pattern data.
 */
export function generateSVGPath(curvePoints?: CurvePoint[]): string {
	if (!curvePoints || curvePoints.length === 0) return '';

	let path = `M ${fmt(curvePoints[0].x)} ${fmt(curvePoints[0].y)}`;

	for (let i = 1; i < curvePoints.length; i++) {
		const pt   = curvePoints[i];
		const prev = curvePoints[i - 1];

		if (pt.controlX !== undefined && pt.controlY !== undefined) {
			path += ` Q ${fmt(pt.controlX)} ${fmt(pt.controlY)} ${fmt(pt.x)} ${fmt(pt.y)}`;
		} else {
			// Smooth midpoint fallback
			const cx = (prev.x + pt.x) / 2;
			const cy = (prev.y + pt.y) / 2;
			path += ` Q ${fmt(cx)} ${fmt(cy)} ${fmt(pt.x)} ${fmt(pt.y)}`;
		}
	}

	return path;
}

function fmt(n: number): string {
	return (Math.round(n * 100) / 100).toString();
}
