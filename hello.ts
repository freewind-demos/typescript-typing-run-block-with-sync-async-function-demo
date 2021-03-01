function runBlock<T>(description: string, fn: () => T): T;
function runBlock<T>(description: string, fn: () => Promise<T>): Promise<T>;
function runBlock<T>(description: string, fn: () => T | Promise<T>): T | Promise<T> {
  console.log(`> block "${description}"`);
  const result = fn();
  if (typeof result === 'object' && 'then' in result) {
    return result.then(data => {
      console.log(`block "${description}" result:`, data);
      return data
    })
  } else {
    console.log(`block "${description}" async result:`, result);
    return result;
  }
}

async function hello() {
  const value1 = runBlock('sync block', () => {
    return 'hello1'
  });
  console.log("### value1", value1);

  const value2 = await runBlock('async block', async () => {
    return await new Promise((resolve) => resolve('hello2'));
  })
  console.log("### value2", value2);
}

hello();
