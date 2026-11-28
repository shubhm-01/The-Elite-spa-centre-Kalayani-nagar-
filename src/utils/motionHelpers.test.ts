import test from 'node:test';
import assert from 'node:assert/strict';
import {
  LUXURY_EASE,
  computeMagneticOffset,
  shouldShowFloatingBar,
} from './motionHelpers.ts';

test('LUXURY_EASE matches calm cubic-bezier curve [0.22, 1, 0.36, 1]', () => {
  assert.deepEqual([...LUXURY_EASE], [0.22, 1, 0.36, 1]);
});

test('shouldShowFloatingBar stays hidden at scroll top and mid-hero', () => {
  assert.equal(shouldShowFloatingBar(0, 840, true), false);
  assert.equal(shouldShowFloatingBar(320, 840, true), false);
  assert.equal(shouldShowFloatingBar(600, 840, true), false);
});

test('shouldShowFloatingBar reveals smoothly once scrolled past Hero section', () => {
  assert.equal(shouldShowFloatingBar(610, 840, true), true);
  assert.equal(shouldShowFloatingBar(1100, 840, true), true);
});

test('shouldShowFloatingBar handles non-hero inner pages cleanly', () => {
  assert.equal(shouldShowFloatingBar(0, 0, false), false);
  assert.equal(shouldShowFloatingBar(120, 0, false), false);
  assert.equal(shouldShowFloatingBar(220, 0, false), true);
});

test('computeMagneticOffset returns zero at center and clamps to maxShift', () => {
  const rect = { left: 100, top: 200, width: 200, height: 60 };
  assert.deepEqual(computeMagneticOffset(200, 230, rect, 10), { x: 0, y: 0 });
  assert.deepEqual(computeMagneticOffset(300, 260, rect, 10), { x: 10, y: 10 });
  assert.deepEqual(computeMagneticOffset(0, 0, rect, 8), { x: -8, y: -8 });
});
