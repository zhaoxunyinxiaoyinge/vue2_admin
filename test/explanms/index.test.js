// const sum =require("./sum.js");
// test('1+2 equan 3',()=>{
//     expect(sum(1,2)).toBe(3)
// })

// test.only('this will be the only test that runs', () => {
//   expect(true).toBe(true);
// });

// test('this test will not run', () => {
//   expect('A').toBe('A');
// });

// test('object assignment', () => {
//     const data = {one: 1};
//     data['two'] = 2;
//     expect(data).toEqual({one: 1, two: 2});
//   });

//   test('adding positive numbers is not zero', () => {
//     for (let a = 1; a < 10; a++) {
//       for (let b = 1; b < 10; b++) {
//         expect(a + b).not.toBe(0);
//       }
//     }
//   });

//   test('adding floating point numbers', () => {
//     const value = 0.1 + 0.2;
//     // expect(value).toBe(0.3);          // This won't work because of rounding error
//     expect(value).toBeCloseTo(0.3); // This works.
//   });

//   test('but there is a "stop" in Christoph', () => {
//     expect('Christoph').toMatch(/stop/);
//   });

//   const shoppingList = [
//     'diapers',
//     'kleenex',
//     'trash bags',
//     'paper towels',
//     'milk',
//   ];

//   test('the shopping list has milk on it', () => {
//     expect(shoppingList).toContain('milk');
//     expect(new Set(shoppingList)).toContain('milk');
//   });

//   function compileAndroidCode() {
//     throw new Error('you are using the wrong JDK');
//   }

//   test('compiling android goes as expected', () => {
//     // expect(() => compileAndroidCode()).toThrow();
//     // expect(() => compileAndroidCode()).toThrow(Error);

//     // You can also use the exact error message or a regexp
//     expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
//     expect(() => compileAndroidCode()).toThrow(/JDK/);
//   });

// const fetchData=(data)=>{return data}

//   test('the data is peanut butter', done => {
//     function callback(data) {
//       try {
//         expect(data).toBe('peanut butter');
//         done();
//       } catch (error) {
//         done(error);
//       }
//     }

//     fetchData(callback("peanut butter"));
//     // done();
//   });

//   const fetchsData=()=>{
//       return  new Promise((resolve,reject)=>{
//          reject("周璟荣")
//       })
//   }

//   test('the data is 周璟荣', () => {
//      fetchsData().then(data => {
//       expect(data).toBe('周璟荣');
//     });
//   });

//   test('the fetch fails with an error', () => {
//     // expect.assertions(1);
//      fetchsData().catch(e => expect(e).toMatch('error'));
//   });

//   const fechDatas=()=>{
//     return new Promise((resolve,reject)=>{
//         resolve(456)
//     })
//   }

//   test('the data is  456', () => {
//      expect(fechDatas()).resolves.toBe('456');
//   });

//   const fetchDatas=()=>{
//    return  new Promise((resolve,reject)=>{
//         resolve("456")
//     })
//   }

//   test('the data is 456', async () => {
//     await expect(fetchDatas()).resolves.toBe('456');
//   });

// //   test('the fetch fails with an error', async () => {
// //     await expect(fetchDatas()).rejects.toMatch('error');
// //   });
let citys = [];
let foods=[];

function initializeCityDatabase() {
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      citys.push("Vienna");
      citys.push("San Juan");
      reslove();
    }, 200);
  });
}

function initializeCityFoodsDatabase(){
  return new Promise((reslove,reject)=>{
    setTimeout(() => {
      foods.push("牛肉面");
      foods.push("西红柿鸡蛋汤");
      reslove();
    },200);
  })
}

function clearCityDatabase() {
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      citys = [];
      reslove();
    }, 200);
  });
}

function isCity(val) {
  return citys.includes(val);
}

function isValidCityFoodPair(name){
  return  foods.includes(name);
}


//异步测试必须加return返回值
beforeEach(() => {
  return initializeCityDatabase();
});

afterEach(() => {
 return  clearCityDatabase();
});

test("city database has Vienna", () => {
  expect(isCity("Vienna")).toBeTruthy();
});

test("city database has San Juan", () => {
  expect(isCity("San Juan")).toBeTruthy();
});

// 一次性设定
beforeAll(() => {
  return initializeCityDatabase();
});

// 一次性设定
afterAll(() => {
 return  clearCityDatabase();
});

test("city database has Vienna", () => {
  expect(isCity("Vienna")).toBeTruthy();
});

test("city database has San Juan", () => {
  expect(isCity("San Juan")).toBeTruthy();
});

describe("test food ",()=>{
  beforeEach(()=>{
    return initializeCityFoodsDatabase();
  })

  test('Vienna <3 veal', () => {
    expect(isValidCityFoodPair('牛肉面')).toBe(true);
  });

  test('San Juan <3 plantains', () => {
    expect(isValidCityFoodPair('西红柿鸡蛋汤')).toBe(true);
  });
})

let forEach = function(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i]);
  }
};

const mockCallback = jest.fn((x) => 42 + x);

let Mock = forEach([0, 1], mockCallback);

test("参数必须是2个", () => {
  expect(mockCallback.mock.calls.length).toBe(2);
  expect(mockCallback.mock.calls[0][0]).toBe(0);
  expect(mockCallback.mock.calls[1][0]).toBe(1);
  expect(mockCallback.mock.results[0].value).toBe(42);
});

test("测试函数的实例指向", () => {
  const myMock = jest.fn();

  const a = new myMock();
  a.name = "xiaomei";
  const b = {};
  b.name = "小王";
  const bound = myMock.bind(b);
  bound();
  expect(myMock.mock.instances[1].name).toEqual("小王");
});

test("测试莫伊函数返回值测试", () => {
  const mock = jest.fn();
  mock.mockReturnValueOnce(true).mockReturnValueOnce(false);
  const result = [null].filter(mock);
});
