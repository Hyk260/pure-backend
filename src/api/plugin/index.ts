import { searchGoogle } from './searchGoogle';

// 这里创建一个函数映射
const functionMap: { [key: string]: Function } = {
  'searchGoogle': searchGoogle,
};

/**
 * 根据给定的 id 获取相应的函数。
 * @param id - 函数名称的参数。
 */
export const getFunctionById = (id: string) => {
  const searchFunction = functionMap[id];
  if (!searchFunction) {
    throw new Error('Function not found');
  }
  return searchFunction;
};