'use client';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { KolamDisplay } from '@/components/KolamDisplay';
import { KolamPattern } from '@/types/kolam';
import { KolamGenerator } from '@/utils/kolamGenerator';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function ContinuousPage() {
	const [currentPattern, setCurrentPattern] = useState<KolamPattern | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [animationSpeed, setAnimationSpeed] = useState(3000);
	const [patternSize, setPatternSize] = useState(5);
	const [isAnimating, setIsAnimating] = useState(false);

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const animationRef = useRef<NodeJS.Timeout | null>(null);

	const generateNewPattern = useCallback(() => {
		try {
			const newPattern = KolamGenerator.generateKolam1D(patternSize);
			setCurrentPattern(newPattern);
		} catch (error) {
			console.error('Failed to generate pattern:', error);
			setCurrentPattern(null);
		}
	}, [patternSize]);

	const togglePlayback = useCallback(() => {
		if (isPlaying) {
			setIsPlaying(false);
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}
			if (animationRef.current) {
				clearTimeout(animationRef.current);
				animationRef.current = null;
			}
			setIsAnimating(false);
		} else {
			setIsPlaying(true);
			generateNewPattern();
		}
	}, [isPlaying, generateNewPattern]);

	useEffect(() => {
		if (!isPlaying || !currentPattern) return;

		setIsAnimating(true);

		const animationDuration = Math.floor(animationSpeed * 0.8);

		animationRef.current = setTimeout(() => {
			setIsAnimating(false);
		}, animationDuration);

		timeoutRef.current = setTimeout(() => {
			if (isPlaying) {
				generateNewPattern();
			}
		}, animationSpeed);

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			if (animationRef.current) {
				clearTimeout(animationRef.current);
			}
		};
	}, [isPlaying, currentPattern, animationSpeed, generateNewPattern]);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			if (animationRef.current) {
				clearTimeout(animationRef.current);
			}
		};
	}, []);

	return (
		<div className="kolam-editor min-h-screen text-[var(--ink)]">
			<Header
				title="Kolam Art Studios"
				subtitle="Continuous sequence—one pattern replaces the next on an interval you set."
				showBackButton={true}
			/>
			<div className="mx-auto max-w-3xl px-6 pb-14 pt-6 md:px-8 md:pb-20 md:pt-8">
				<div className="kolam-display-area">
					{currentPattern ? (
						<div className="kolam-container panel-metal relative flex items-center justify-center p-4 md:p-5">
							<div className="panel-metal-inner relative flex w-full items-center justify-center px-6 py-10 md:px-10 md:py-12">
								<KolamDisplay
									pattern={currentPattern}
									animate={isAnimating}
									animationState={isAnimating ? 'playing' : 'stopped'}
									animationTiming={Math.floor(animationSpeed * 0.8)}
									className="kolam-main"
								/>

								<div className="absolute left-3 top-3 md:left-4 md:top-4">
									<div
										className={`rounded-full border border-[color:var(--border-soft)] px-3 py-1.5 text-xs font-medium ${
											isPlaying
												? 'bg-[var(--paper)]/95 text-[var(--accent-bright)]'
												: 'bg-[var(--background)]/90 text-[var(--ink)]/65'
										}`}
									>
										<span className="inline-flex items-center gap-2">
											<span
												className={`h-1.5 w-1.5 rounded-full ${isPlaying ? 'bg-[var(--accent-bright)]' : 'bg-[var(--ink)]/35'}`}
												aria-hidden
											/>
											{isPlaying ? 'Running' : 'Stopped'}
										</span>
									</div>
								</div>

								<div className="absolute right-3 top-3 md:right-4 md:top-4">
									<div className="rounded-full border border-[color:var(--border-soft)] bg-[var(--paper)]/95 px-3 py-1.5 text-xs text-[var(--ink)]/75">
										{currentPattern.dots.length} dots · {currentPattern.curves.length} curves
										{isAnimating && <span className="ml-1.5 text-[var(--accent-bright)]">Drawing</span>}
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className="kolam-container panel-metal flex h-80 items-center justify-center">
							<div className="text-center text-sm text-[var(--ink)]/45">
								<div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-[color:var(--border-soft)] border-t-[var(--accent-bright)]" />
								Generating…
							</div>
						</div>
					)}
				</div>

				<div className="controls-area mt-10">
					<div className="controls-container panel-metal px-5 py-7 md:px-8 md:py-9">
						<h2 className="font-display mb-6 border-b border-[color:var(--border-soft)] pb-6 bg-gradient-to-b from-[var(--accent-bright)] to-[var(--accent-muted)] bg-clip-text text-2xl font-semibold text-transparent">
							Interval
						</h2>
						<div className="parameters-grid mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
							<div className="parameter-group">
								<label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--accent-muted)]">
									Seconds per pattern
								</label>
								<div className="flex items-center gap-3">
									<input
										type="range"
										min="1"
										max="10"
										step="0.5"
										value={animationSpeed / 1000}
										onChange={(e) => setAnimationSpeed(parseFloat(e.target.value) * 1000)}
										disabled={isPlaying}
										className="flex-1 accent-[var(--accent-bright)] disabled:opacity-50"
									/>
									<span className="w-12 tabular-nums text-sm text-[var(--ink)]/70">
										{(animationSpeed / 1000).toFixed(1)}s
									</span>
								</div>
							</div>

							<div className="parameter-group">
								<label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--accent-muted)]">
									Grid size
								</label>
								<select
									value={patternSize}
									onChange={(e) => setPatternSize(parseInt(e.target.value))}
									disabled={isPlaying}
									className="w-full rounded-2xl border border-[color:var(--border-soft)] bg-[var(--floor)] px-3 py-2.5 text-sm text-[var(--ink)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] disabled:cursor-not-allowed disabled:opacity-50"
								>
									<option value={3}>3 × 3</option>
									<option value={4}>4 × 4</option>
									<option value={5}>5 × 5</option>
									<option value={6}>6 × 6</option>
									<option value={7}>7 × 7</option>
								</select>
							</div>
						</div>

						<div className="flex flex-wrap items-center justify-center gap-4 border-t border-[color:var(--border-soft)] pt-7">
							<button
								type="button"
								onClick={togglePlayback}
								className={
									isPlaying ? 'btn-metal px-8 py-3 text-xs font-semibold uppercase tracking-[0.12em]' : 'btn-metal-primary px-8 py-3'
								}
							>
								{isPlaying ? 'Pause' : 'Start sequence'}
							</button>

							<button
								type="button"
								onClick={generateNewPattern}
								disabled={isPlaying}
								className="btn-metal px-8 py-3 text-xs font-semibold uppercase tracking-[0.12em] disabled:opacity-40"
							>
								New pattern now
							</button>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}
