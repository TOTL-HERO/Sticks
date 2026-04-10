import { describe, it, expect } from 'vitest';
import { getScoreColor } from '../getScoreColor';

describe('getScoreColor', () => {
  it('returns gold for eagle or better', () => {
    expect(getScoreColor(2, 4)).toBe('#e9c349'); // eagle
    expect(getScoreColor(1, 4)).toBe('#e9c349'); // double eagle
    expect(getScoreColor(1, 3)).toBe('#e9c349'); // hole in one on par 3
  });

  it('returns green for birdie', () => {
    expect(getScoreColor(3, 4)).toBe('#84d7af');
    expect(getScoreColor(2, 3)).toBe('#84d7af');
    expect(getScoreColor(4, 5)).toBe('#84d7af');
  });

  it('returns neutral for par', () => {
    expect(getScoreColor(4, 4)).toBe('#dfe4dd');
    expect(getScoreColor(3, 3)).toBe('#dfe4dd');
    expect(getScoreColor(5, 5)).toBe('#dfe4dd');
  });

  it('returns light red for bogey', () => {
    expect(getScoreColor(5, 4)).toBe('#ffb4ab');
    expect(getScoreColor(4, 3)).toBe('#ffb4ab');
  });

  it('returns darker red for double bogey+', () => {
    expect(getScoreColor(6, 4)).toBe('#ff7961');
    expect(getScoreColor(7, 4)).toBe('#ff7961');
    expect(getScoreColor(10, 4)).toBe('#ff7961');
  });
});
