describe('Simple Tests', () => {
  it('should check if true is true', () => {
    expect(true).toBe(true);
  });

  it('should check if 1 + 1 equals 2', () => {
    expect(1 + 1).toBe(2);
  });

  it('should check if string length is correct', () => {
    const str = 'Hello, World!';
    expect(str.length).toBe(13);
  });
});
