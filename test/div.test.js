'use strict';
const div = require('../lib/div');

test('23456789123456789123456789 * (-1) to equal -23456789123456789123456789', () =>{
  expect(div('23456789123456789123456789','-1')).toBe('-23456789123456789123456789');
});

test('23456789123456789123456789 / 1 to equal 23456789123456789123456789', () =>{
  expect(div('23456789123456789123456789','1')).toBe('23456789123456789123456789');
});

test('23456789123456789123456789 / 33332 to equal 703731822976622738613', () =>{
  expect(div('23456789123456789123456789','33332')).toBe('703731822976622738613');
});

test('-23456789123456789123456789 / - 1 to equal 23456789123456789123456788', () =>{
  expect(div('-23456789123456789123456789','-1')).toBe('23456789123456789123456789');
});

test('-2 / (-2) to equal 1', () =>{
  expect(div("-2", "-2")).toBe("1");
});

test('2 / (-2) to equal -1', () =>{
  expect(div("2", "-2")).toBe("-1");
});

test('-5 / 4 to equal -1', () =>{
  expect(div("-5", "4")).toBe("-1");
});

test('-5 / (-6) to equal 0', () =>{
  expect(div("-5", "-6")).toBe("0");
});