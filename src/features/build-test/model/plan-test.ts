import type { CategoryId } from '@content/types';
import type { LevelProgress } from '@/entities/user/model/types';
import type { TestKind } from '@/entities/attempt/model/types';
import { randomSeed } from '@/shared/lib/random';
import { generateTest, type TestPlan, type TestRequest } from './generate';
import { splitByMix, type TestPreset } from './presets';

export interface PlanOptions {
  levelId: string;
  kind: TestKind;
  count: number;
  topicIds: string[];
  categoryIds: CategoryId[];
  adaptive: boolean;
  mistakesOnly: boolean;
  mix: TestPreset['mix'];
  seed?: number;
}

/**
 * Build a test. When a category mix is given, each section is generated
 * separately so the paper keeps the real exam proportions; a section that
 * cannot be filled hands its remaining slots to the other sections.
 */
export function planTest(options: PlanOptions, progress: LevelProgress): TestPlan {
  const seed = options.seed ?? randomSeed();
  const base: TestRequest = {
    levelId: options.levelId,
    kind: options.kind,
    count: options.count,
    topicIds: options.topicIds,
    categoryIds: options.categoryIds,
    adaptive: options.adaptive,
    mistakesOnly: options.mistakesOnly,
    seed,
  };

  const usesMix = options.mix !== null && options.topicIds.length === 0;
  if (!usesMix) return generateTest(base, progress);

  const quotas = splitByMix(options.count, options.mix!);
  const items: TestPlan['items'] = [];
  const warnings: string[] = [];
  let poolSize = 0;
  let deficit = 0;

  quotas.forEach(([categoryId, wanted], i) => {
    if (wanted === 0) return;
    const plan = generateTest(
      { ...base, count: wanted, categoryIds: [categoryId], seed: seed + i * 7919 },
      progress,
    );
    items.push(...plan.items);
    poolSize += plan.poolSize;
    deficit += plan.shortfall;
    warnings.push(...plan.warnings);
  });

  // Refill any deficit from the sections that still have unused questions.
  if (deficit > 0) {
    const used = new Set(items.map((item) => item.questionId));
    const filler = generateTest({ ...base, count: deficit + used.size, seed: seed + 104729 }, progress);
    for (const item of filler.items) {
      if (items.length >= options.count) break;
      if (used.has(item.questionId)) continue;
      used.add(item.questionId);
      items.push(item);
    }
  }

  const shortfall = options.count - items.length;
  if (shortfall > 0) {
    warnings.push(
      `The verified question bank can supply ${items.length} unique questions for this test, ` +
      `not ${options.count}. Nothing has been repeated to pad it out.`,
    );
  }

  return {
    request: { ...base, count: options.count },
    items,
    shortfall: Math.max(shortfall, 0),
    poolSize,
    warnings: [...new Set(warnings)],
  };
}
