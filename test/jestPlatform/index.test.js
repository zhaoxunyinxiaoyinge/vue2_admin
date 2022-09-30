const {diff} = require('jest-diff');

const a = {a: {b: {c: 5}}};
const b = {a: {b: {c: 6}}};

const result = diff(a, b);
console.log(result)

test('测试result',()=>{
    expect(1).toBe(1)
})