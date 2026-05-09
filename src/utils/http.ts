/**
 * uni.request / uni.uploadFile 拦截与 http 封装
 * 环境变量见 .env.example；baseURL / 成功码 / 请求头等均可配置。
 */
import { useMemberStore } from "@/stores/modules/member";
import { navigateToLogin } from "@/utils/navigation";

const DEFAULT_BASE =
  "https://pcapi-xiaotuxian-front-devtest.itheima.net";

const baseURL =
  import.meta.env.VITE_API_BASE_URL?.trim() || DEFAULT_BASE;

const successCodes = (import.meta.env.VITE_API_SUCCESS_CODE || "1")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const authBearer = import.meta.env.VITE_API_AUTH_BEARER === "true";

const sourceHeaderKey =
  import.meta.env.VITE_API_SOURCE_HEADER_KEY?.trim() || "source-client";
const sourceHeaderValue =
  import.meta.env.VITE_API_SOURCE_HEADER_VALUE?.trim() || "miniapp";

function isBusinessSuccess(code: string) {
  return successCodes.includes(String(code));
}

// 添加拦截器
const httpInterceptor = {
  invoke(options: UniApp.RequestOptions) {
    if (!options.url.startsWith("http")) {
      options.url = baseURL + options.url;
    }

    options.timeout = 10000;

    const extraHeaders: Record<string, string> = {
      [sourceHeaderKey]: sourceHeaderValue,
    };

    options.header = {
      ...options.header,
      ...extraHeaders,
    };

    const memberStore = useMemberStore();
    const token = memberStore.profile?.token;
    if (token) {
      options.header.Authorization = authBearer ? `Bearer ${token}` : token;
    }
  },
};

uni.addInterceptor("request", httpInterceptor);
uni.addInterceptor("uploadFile", httpInterceptor);

interface Data<T> {
  code: string;
  msg: string;
  result: T;
}

export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const body = res.data as Data<T>;
          if (
            body &&
            typeof (body as { code?: unknown }).code !== "undefined" &&
            !isBusinessSuccess(String(body.code))
          ) {
            uni.showToast({
              icon: "none",
              title: body.msg || "请求失败",
            });
            reject(res);
            return;
          }
          resolve(body);
        } else if (res.statusCode === 401) {
          const memberStore = useMemberStore();
          memberStore.clearProfile();
          navigateToLogin();
          reject(res);
        } else {
          uni.showToast({
            icon: "none",
            title: (res.data as Data<T>).msg || "请求错误",
          });
          reject(res);
        }
      },
      fail(err) {
        uni.showToast({
          icon: "none",
          title: "网络错误，换个网络试试",
        });
        reject(err);
      },
    });
  });
};

export { baseURL };
