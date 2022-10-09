const typeCall = (obj: any): string => {
  const typeStr = Object.prototype.toString.call(obj);
  return typeStr.substring(8, typeStr.length - 1)
};

export function isObj(obj:any): boolean {
  return typeCall(obj) === 'Object';
}

export function isNull(obj: any): boolean {
  return typeCall(obj) === 'Null';
}

export function isNum(num: any): boolean {
  return typeCall(num) === "number";
}

export function isStr(str: any): boolean {
  return typeCall(str) === "string";
}

export function isBool(obj: any): boolean {
  return typeCall(obj) === "boolean";
}

export function isArr(obj: any): boolean {
  return Array.isArray(obj);
}

export function isFun(obj: any): boolean {
  return typeCall(obj) === "Function";
}

export function isPromise(obj: any): boolean {
  return (isObj(obj) || isFun(obj)) && isFun(obj.then);
}
