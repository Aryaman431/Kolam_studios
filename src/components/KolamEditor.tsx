'use client';

import { Footer } from '@/components/Footer';
import { KolamPattern } from '@/types/kolam';
import { KolamExporter } from '@/utils/kolamExporter';
import { KolamGenerator } from '@/utils/kolamGenerator';
import { generateEmbedURL, updateURL, useKolamURLParams } from '@/utils/urlParams';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { KolamDisplay } from './KolamDisplay';

const LEVEL_DESCRIPTIONS: Record<number, string> = {
	1: 'Simple loop patterns with circular dots and gentle symmetry.',
	2: 'Diamond grid, interconnected paths, horizontal and vertical symmetry.',
	3: 'Dense, interwoven diamond patterns with multi-axis symmetry.',
};

export const KolamEditor: React.FC = () => {
	const [currentPattern, setCurrentPattern] = useState<KolamPattern | null>(null);
	const [isExporting, setIsExporting] = useState(false);
	const [showDownloadMenu, setShowDownloadMenu] = useState(false);
	const [animationState, setAnimationState] = useState<'stopped' | 'playing' | 'paused'>('stopped');
	const [level, setLevel] = useState(1);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const kolamRef = useRef<HTMLDivElement>(null);
	const transitionTimer = useRef<number | null>(null);

	const urlParams = useKolamURLParams();
	const [width, setWidth] = useState(urlParams.width);
	const [height, setHeight] = useState(urlParams.height);
	const animationDuration = urlParams.duration;
	const initialAutoAnimate = urlParams.initialAutoAnimate;

	useEffect(() => {
		updateURL({ width, height, duration: animationDuration, initialAutoAnimate });
	}, [width, height, animationDuration, initialAutoAnimate]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (showDownloadMenu && !(event.target as Element).closest('.download-menu')) {
				setShowDownloadMenu(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [showDownloadMenu]);

	useEffect(() => {
		return () => {
			if (transitionTimer.current !== null) {
				window.clearTimeout(transitionTimer.current);
			}
		};
	}, []);

	useEffect(() => {
		if (animationState === 'playing' && currentPattern) {
			const timer = setTimeout(() => {
				setAnimationState('stopped');
			}, animationDuration);
			return () => clearTimeout(timer);
		}
	}, [animationState, currentPattern, animationDuration]);

	const generatePattern = useCallback(() => {
		try {
			if (transitionTimer.current !== null) {
				window.clearTimeout(transitionTimer.current);
			}
			setIsTransitioning(true);
			const pattern = KolamGenerator.generateKolam(width, height, level);
			setCurrentPattern(pattern);
			setAnimationState('stopped');

			if (initialAutoAnimate) {
				setTimeout(() => setAnimationState('playing'), 100);
			}
		} catch (error) {
			console.error('Error generating pattern:', error);
			const errorMessage = error instanceof Error ? error.message : String(error);
			alert(`Error generating pattern: ${errorMessage}`);
		} finally {
			transitionTimer.current = window.setTimeout(() => {
				setIsTransitioning(false);
			}, 160);
		}
	}, [width, height, initialAutoAnimate, level]);

	// Auto-regenerate when level, width, or height changes
	useEffect(() => {
		generatePattern();
	}, [generatePattern]);

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.target instanceof HTMLElement && (event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT')) {
				return;
			}
			switch (event.key.toLowerCase()) {
				case ' ':
				case 'p':
					event.preventDefault();
					setAnimationState(s => s === 'playing' ? 'stopped' : 'playing');
					break;
				case 'g':
					event.preventDefault();
					generatePattern();
					break;
				case '1': setLevel(1); break;
				case '2': setLevel(2); break;
				case '3': setLevel(3); break;
				case 'escape':
					event.preventDefault();
					setAnimationState('stopped');
					break;
			}
		};
		window.addEventListener('keydown', handleKeyPress);
		return () => window.removeEventListener('keydown', handleKeyPress);
	}, [animationState, generatePattern]);

	const exportPattern = async (format: 'svg' | 'png' | 'gif') => {
		if (!currentPattern || !kolamRef.current) return;
		setIsExporting(true);
		try {
			switch (format) {
				case 'svg': await KolamExporter.downloadSVG(currentPattern); break;
				case 'png': await KolamExporter.downloadPNG(kolamRef.current, currentPattern.name); break;
				case 'gif':
					await KolamExporter.downloadAnimatedGIF(
						kolamRef.current, currentPattern, currentPattern.name,
						{ format: 'gif', frameCount: 30, delay: animationDuration }
					);
					break;
			}
		} catch (error) {
			console.error('Export failed:', error);
			alert('Export failed. Please try again.');
		} finally {
			setIsExporting(false);
		}
	};

	const getEmbedCode = async () => {
		if (!currentPattern) return;
		try {
			const embedURL = generateEmbedURL({ width, height, background: '#080809', brush: '#ffffff' });
			const embedCode = `<img src="${embedURL}" alt="Kolam Pattern" style="max-width: 100%; height: auto;" />`;
			await navigator.clipboard.writeText(embedCode);
			alert('Embed code copied to clipboard.');
		} catch {
			alert('Failed to copy embed code. Please try again.');
		}
	};

	const copyRawSVG = async () => {
		if (!currentPattern) return;
		try {
			const svgContent = await KolamExporter.exportAsSVG(currentPattern);
			await navigator.clipboard.writeText(svgContent);
			alert('SVG markup copied to clipboard.');
		} catch {
			alert('Failed to copy raw SVG. Please try again.');
		}
	};

	return (
		<div className="kolam-editor text-[var(--ink)]">
			<div className="mx-auto max-w-3xl px-6 pb-14 pt-6 md:px-8 md:pb-20 md:pt-8">

				{/* Level Indicator */}
				<div className="mb-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--accent-muted)]">
							Level
						</span>
						<div className="flex gap-2">
							{[1, 2, 3].map((option) => (
								<button
									key={option}
									type="button"
									onClick={() => setLevel(option)}
									className={`btn-metal px-4 py-2 text-xs font-semibold transition-all duration-200 ${
										level === option
											? 'bg-[var(--accent-bright)] text-black scale-105'
											: 'bg-[var(--floor)] text-[var(--ink)]/70 hover:text-[var(--ink)]'
									}`}
									title={`Switch to Level ${option} (press ${option})`}
								>
									{option}
								</button>
							))}
						</div>
					</div>
					<span className="text-xs text-[var(--ink)]/40 italic">
						{LEVEL_DESCRIPTIONS[level]}
					</span>
				</div>

				{/* Pattern Display */}
				<div className="kolam-display-area">
					{currentPattern ? (
						<div
							ref={kolamRef}
							className="kolam-container panel-metal relative flex items-center justify-center p-4 md:p-5"
						>
							{/* Level badge inside the panel */}
							<div className="absolute left-4 top-4 z-10 rounded-full bg-[rgba(15,23,42,0.85)] px-4 py-1 text-xs uppercase tracking-[0.24em] text-white shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
								Level {level}
							</div>

							<div className={`panel-metal-inner flex w-full items-center justify-center px-6 py-10 md:px-10 md:py-12 transition-opacity duration-200 ${isTransitioning ? 'opacity-40' : 'opacity-100'}`}>
								<KolamDisplay
									pattern={currentPattern}
									animate={animationState === 'playing'}
									animationState={animationState}
									animationTiming={animationDuration}
									className="kolam-main"
								/>
							</div>
						</div>
					) : (
						<div className="no-pattern panel-metal py-16 text-center">
							<p className="text-sm text-[var(--ink)]/45">Preparing the first drawing…</p>
						</div>
					)}
				</div>

				{/* Generate + Export controls */}
				{currentPattern && (
					<div className="mt-6 flex flex-wrap items-center justify-between gap-3">
						<button
							type="button"
							onClick={() => generatePattern()}
							className="btn-metal-primary px-8 py-2.5 text-sm font-semibold uppercase tracking-[0.12em]"
							title="Generate new pattern with same level and grid (G)"
						>
							Generate
						</button>
						<div className="flex items-center gap-3">
						<div className="relative download-menu">
							<button
								type="button"
								onClick={() => setShowDownloadMenu(!showDownloadMenu)}
								disabled={isExporting}
								className="btn-metal px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.12em]"
								title="Export"
							>
								{isExporting ? 'Working…' : 'Export'}
							</button>

							{showDownloadMenu && (
								<div className="absolute right-0 z-10 mt-3 min-w-[12rem] overflow-hidden rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--paper)] py-1 text-sm shadow-[var(--shadow-elevated)]">
									<button type="button" onClick={() => { exportPattern('svg'); setShowDownloadMenu(false); }} className="w-full px-4 py-2.5 text-left text-[var(--ink)]/90 transition hover:bg-white/[0.06]">
										Download SVG
									</button>
									<button type="button" onClick={() => { exportPattern('png'); setShowDownloadMenu(false); }} className="w-full px-4 py-2.5 text-left text-[var(--ink)]/90 transition hover:bg-white/[0.06]">
										Download PNG
									</button>
									<hr className="border-[color:var(--border-soft)]" />
									<button type="button" onClick={() => { getEmbedCode(); setShowDownloadMenu(false); }} className="w-full px-4 py-2.5 text-left text-[var(--ink)]/90 transition hover:bg-white/[0.06]">
										Copy embed HTML
									</button>
									<button type="button" onClick={() => { copyRawSVG(); setShowDownloadMenu(false); }} className="w-full px-4 py-2.5 text-left text-[var(--ink)]/90 transition hover:bg-white/[0.06]">
										Copy raw SVG
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
				)}

				{/* Settings panel */}
				<section className="panel-metal mt-10 px-5 py-7 md:px-8 md:py-9">
					<div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-[color:var(--border-soft)] pb-6">
						<div>
							<h2 className="font-display bg-gradient-to-b from-[var(--accent-bright)] to-[var(--accent-muted)] bg-clip-text text-2xl font-semibold text-transparent">
								Compose
							</h2>
							<p className="mt-2 max-w-md text-sm text-[var(--ink)]/45">
								Adjust grid size — pattern regenerates automatically.
							</p>
						</div>
					</div>

					<div className="mb-8 grid grid-cols-1 gap-8">
						<div>
							<p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--accent-muted)]">
								Grid Dimensions
							</p>
							<div className="flex items-center gap-6">
								<div className="flex flex-col items-center gap-2">
									<label className="text-xs text-[var(--ink)]/60">Width</label>
									<div className="flex items-center gap-2">
										<button type="button" onClick={() => setWidth((prev) => Math.max(3, prev - 1))} className="btn-metal flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg leading-none" aria-label="Decrease width">−</button>
										<div className="min-w-[3rem] rounded-2xl border border-[color:var(--border-soft)] bg-[var(--floor)] py-2.5 text-center text-sm font-medium tabular-nums text-[var(--accent-bright)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">{width}</div>
										<button type="button" onClick={() => setWidth((prev) => Math.min(15, prev + 1))} className="btn-metal flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg leading-none" aria-label="Increase width">+</button>
									</div>
								</div>
								<div className="text-lg text-[var(--ink)]/40">×</div>
								<div className="flex flex-col items-center gap-2">
									<label className="text-xs text-[var(--ink)]/60">Height</label>
									<div className="flex items-center gap-2">
										<button type="button" onClick={() => setHeight((prev) => Math.max(3, prev - 1))} className="btn-metal flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg leading-none" aria-label="Decrease height">−</button>
										<div className="min-w-[3rem] rounded-2xl border border-[color:var(--border-soft)] bg-[var(--floor)] py-2.5 text-center text-sm font-medium tabular-nums text-[var(--accent-bright)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">{height}</div>
										<button type="button" onClick={() => setHeight((prev) => Math.min(15, prev + 1))} className="btn-metal flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg leading-none" aria-label="Increase height">+</button>
									</div>
								</div>
							</div>
							<p className="mt-2 text-xs text-[var(--ink)]/40">Between 3 and 15 for each dimension.</p>
						</div>
					</div>
				</section>
			</div>

			<Footer />
		</div>
	);
};
