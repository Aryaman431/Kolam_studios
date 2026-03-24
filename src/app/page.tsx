import { Header } from '@/components/Header';
import { KolamEditor } from '@/components/KolamEditor';
import { GeometricBackground } from '@/components/GeometricBackground';
import { KolamHistory } from '@/components/KolamHistory';
import { Suspense } from 'react';

export default function Home() {
	return (
		<div className="min-h-screen">
			<GeometricBackground />

			<Header
				title="Kolam Art Studios"
				subtitle="Floor geometry from kolam tradition. Each piece is new—set the grid, adjust how fast the strokes reveal, then keep the one you like."
			/>

			<Suspense
				fallback={
					<div className="flex min-h-[40vh] items-center justify-center">
						<p className="text-sm tracking-wide text-[var(--ink)]/45">Opening the editor…</p>
					</div>
				}
			>
				<KolamEditor />
			</Suspense>

			<KolamHistory />
		</div>
	);
}
