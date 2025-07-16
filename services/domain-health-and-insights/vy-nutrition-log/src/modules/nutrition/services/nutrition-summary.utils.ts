import { BreastEvent } from '../../../entities/breast_event.entity';
import { BottleEvent } from '../../../entities/bottle_event.entity';
import { SolidsEvent } from '../../../entities/solids_event.entity';
import { PumpingEvent } from '../../../entities/pumping_event.entity';

export function computeDurationSecs(start: Date, end: Date): number {
  return Math.round((end.getTime() - start.getTime()) / 1000);
}

export function computeBottleIntake(events: BottleEvent[], type: string): number {
  return events
    .filter(e => e.contentType === type)
    .reduce((sum, e) => {
      if (
        e.volumeStartMl !== undefined &&
        e.volumeStartMl !== null &&
        e.volumeEndMl !== undefined &&
        e.volumeEndMl !== null
      ) {
        return sum + Math.max(0, e.volumeStartMl - e.volumeEndMl);
      }
      return sum;
    }, 0);
}

export function computeTotalPumped(events: PumpingEvent[]): number {
  return events.reduce((sum, e) => sum + (e.volumeMl ?? 0), 0);
}

export function computeBreastSwitchCount(events: BreastEvent[]): number {
  let count = 0;
  let lastSide = '';
  for (const e of events) {
    if (e.action === 'START') {
      if (lastSide && e.side !== lastSide) {
        count++;
      }
      lastSide = e.side;
    }
  }
  return count;
}

export function computeSolidsSummary(events: SolidsEvent[]): any {
  if (!events.length) return null;
  const reactions: Record<string, number> = {};
  for (const e of events) {
    if (e.reaction) {
      reactions[e.reaction] = (reactions[e.reaction] || 0) + 1;
    }
  }
  return {
    count: events.length,
    reactions,
  };
}

export function computeEventsCount(...arrays: { length: number }[]): number {
  return arrays.reduce((sum, arr) => sum + arr.length, 0);
}
