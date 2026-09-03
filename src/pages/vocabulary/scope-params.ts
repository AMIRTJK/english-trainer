import type { SessionScope } from '@/features/vocab-learning';

/** A learning scope survives in the URL, so a session can be linked to. */
export function scopeToParams(scope: SessionScope): string {
  const params = new URLSearchParams({ scope: scope.kind });
  if (scope.kind === 'unit') params.set('value', scope.unitId);
  if (scope.kind === 'topic') params.set('value', scope.topicId);
  if (scope.kind === 'sound' || scope.kind === 'contrast') params.set('value', scope.sound);
  return params.toString();
}

export function scopeFromParams(params: URLSearchParams): SessionScope {
  const kind = params.get('scope') ?? 'all';
  const value = params.get('value') ?? '';
  switch (kind) {
    case 'unit':
      return value ? { kind: 'unit', unitId: value } : { kind: 'all' };
    case 'topic':
      return value ? { kind: 'topic', topicId: value } : { kind: 'all' };
    case 'sound':
      return value ? { kind: 'sound', sound: value } : { kind: 'all' };
    case 'contrast':
      return value ? { kind: 'contrast', sound: value } : { kind: 'all' };
    case 'sound-task':
      return { kind: 'sound-task' };
    case 'review':
      return { kind: 'review' };
    default:
      return { kind: 'all' };
  }
}

export function scopeTitle(scope: SessionScope, names: Map<string, string>): string {
  switch (scope.kind) {
    case 'unit':
      return names.get(scope.unitId) ?? 'Unit';
    case 'topic':
      return names.get(scope.topicId) ?? 'Topic';
    case 'sound':
      return `Sound ${names.get(scope.sound) ?? scope.sound}`;
    case 'contrast':
      return `${names.get(scope.sound) ?? scope.sound} and the sounds it is confused with`;
    case 'sound-task':
      return 'Words from “different sound” questions';
    case 'review':
      return 'Repeat what you missed';
    default:
      return 'The whole word list';
  }
}
