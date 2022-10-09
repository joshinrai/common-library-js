import { isFun } from "../data-type";

function response(http: {
  interceptors: {
    response: {
      use: (
        arg0: (res: any) => any,
        arg1: (err: any) => Promise<never>
      ) => void;
    };
  };
}) {
  http.interceptors.response.use(
    (res) => {
      const { config } = res;
      const { transformResult } = config;
      const result = isFun(transformResult) ? transformResult(res) : res; // 请求结果处理
      return result;
    },
    (err) => {
      const { config } = err;
      const { error } = config || {};
      const message = err.message;
      if (isFun(error)) {
        error(err);
      } else {
        console.error(message);
      }
      return Promise.reject(err);
    }
  );
}

export default response;
