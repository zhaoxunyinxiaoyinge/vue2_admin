const sum =require("./sum.js");
test('1+2 equan 3',()=>{
    expect(sum(1,2)).toBe(3)
})

test('object assignment', () => {
    const data = {one: 1};
    data['two'] = 2;
    expect(data).toEqual({one: 1, two: 2});
  });


  test('adding positive numbers is not zero', () => {
    for (let a = 1; a < 10; a++) {
      for (let b = 1; b < 10; b++) {
        expect(a + b).not.toBe(0);
      }
    }
  });

  test('adding floating point numbers', () => {
    const value = 0.1 + 0.2;
    // expect(value).toBe(0.3);          // This won't work because of rounding error
    expect(value).toBeCloseTo(0.3); // This works.
  });

  test('but there is a "stop" in Christoph', () => {
    expect('Christoph').toMatch(/stop/);
  });

  const shoppingList = [
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'milk',
  ];

  test('the shopping list has milk on it', () => {
    expect(shoppingList).toContain('milk');
    expect(new Set(shoppingList)).toContain('milk');
  });


  function compileAndroidCode() {
    throw new Error('you are using the wrong JDK');
  }

  test('compiling android goes as expected', () => {
    // expect(() => compileAndroidCode()).toThrow();
    // expect(() => compileAndroidCode()).toThrow(Error);
  
    // You can also use the exact error message or a regexp
    expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
    expect(() => compileAndroidCode()).toThrow(/JDK/);
  });


const fetchData=(data)=>{return data}

  test('the data is peanut butter', done => {
    function callback(data) {
      try {
        expect(data).toBe('peanut butter');
        done();
      } catch (error) {
        done(error);
      }
    }
  
    fetchData(callback("peanut butter"));
    // done();
  });

  const fetchsData=()=>{
      return  new Promise((resolve,reject)=>{
         reject("周璟荣")
      })
  }

  test('the data is 周璟荣', () => {
     fetchsData().then(data => {
      expect(data).toBe('周璟荣');
    });
  });

  test('the fetch fails with an error', () => {
    // expect.assertions(1);
     fetchsData().catch(e => expect(e).toMatch('error'));
  });


  const fechDatas=()=>{
    return new Promise((resolve,reject)=>{
        resolve(456)
    })
  }



  test('the data is  456', () => {
     expect(fechDatas()).resolves.toBe('456');
  });


  const fetchDatas=()=>{
   return  new Promise((resolve,reject)=>{
        resolve("456")
    })
  }

  test('the data is 456', async () => {
    await expect(fetchDatas()).resolves.toBe('456');
  });
  
//   test('the fetch fails with an error', async () => {
//     await expect(fetchDatas()).rejects.toMatch('error');
//   });
  let  citys=[];


  function initializeCityDatabase(){
    citys.push("Vienna");
    citys.push("San Juan");
  }

  function clearCityDatabase(){
    citys=[];
  }

  function isCity (val){
    return citys.includes(val);
  }


beforeEach(() => {
    initializeCityDatabase();
  });
  
  afterEach(() => {
    clearCityDatabase();
  });
  
  test('city database has Vienna', () => {
    expect(isCity('Vienna')).toBeTruthy();
  });
  
  test('city database has San Juan', () => {
    expect(isCity('San Juan')).toBeTruthy();
  });

  