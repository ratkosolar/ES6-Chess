import Chess from './chess';

test('sample test', () => {
  const chess = new Chess('test');
  expect(chess.name).toBe('test');
});
