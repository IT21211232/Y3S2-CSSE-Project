// Simple addition function
function add(a, b) {
  return a + b;
}

// Simple subtraction function
function subtract(a, b) {
  return a - b;
}

describe('Calendar Render Test Suite', () => {
  test('adds 2 + 3 to equal 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('adds 0 + 0 to equal 0', () => {
    expect(add(0, 0)).toBe(0);
  });

  test('subtracts 5 - 3 to equal 2', () => {
    expect(subtract(5, 3)).toBe(2);
  });

  test('subtracts 3 - 5 to equal -2', () => {
    expect(subtract(3, 5)).toBe(-2);
  });
});