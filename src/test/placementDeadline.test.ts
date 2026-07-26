import { describe, it, expect } from 'vitest';
import { resolveDeadlineDisplay } from '../lib/candidate/placementDeadline';

describe('Candidate Placement Deadline Resolver', () => {
  it('detects overdue deadline relative to provided reference date', () => {
    const refDate = new Date('2026-08-01T12:00:00Z');
    const deadlineIso = '2026-07-25T12:00:00Z';

    const display = resolveDeadlineDisplay(deadlineIso, refDate);
    expect(display.isOverdue).toBe(true);
    expect(display.label).toBe('Overdue');
  });

  it('detects due today deadline', () => {
    const refDate = new Date('2026-08-01T10:00:00Z');
    const deadlineIso = '2026-08-01T18:00:00Z';

    const display = resolveDeadlineDisplay(deadlineIso, refDate);
    expect(display.isOverdue).toBe(false);
    expect(display.label).toBe('Due today');
  });

  it('calculates future days remaining', () => {
    const refDate = new Date('2026-08-01T10:00:00Z');
    const deadlineIso = '2026-08-06T10:00:00Z';

    const display = resolveDeadlineDisplay(deadlineIso, refDate);
    expect(display.isOverdue).toBe(false);
    expect(display.label).toBe('Due in 5 days');
  });
});
