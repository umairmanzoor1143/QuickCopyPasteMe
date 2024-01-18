import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const getLocalStorage = (name: string, parse = true) => {
  try {
    if (parse) {
      return JSON.parse(localStorage.getItem(name) || "");
    } else {
      return localStorage.getItem(name);
    }
  } catch (e) {
    return undefined;
  }
};

const codeMessage: { [key: string]: string } = {
  200: "The request has succeeded",
  201: "New resource has been created ",
  202: "The request has been received",
  204: "No Content",
  400: "The server could not understand the request due to invalid syntax.",
  401: "Unauthorized Operation",
  403: "You do not have access rights to the content",
  404: "Not Found",
  406: "Not Acceptable",
  410: "The request content is not longer available",
  422: "The request was well-formed but was unable to be followed due to semantic errors.",
  500: "The server has encountered a situation it doesn't know how to handle",
  502: "Bad Gateway",
  503: "The server is not ready to handle the request",
  504: "Timeout",
};

export const API_POOL = {
  "user-mng": process.env.REACT_APP_USER_MNG_BASE_URL,
  "dev-sett": process.env.REACT_APP_DEV_SETT_BASE_URL,
  "gui-fusion": process.env.REACT_APP_GUI_FUSION_BASE_URL,
  "data-mng": process.env.REACT_APP_DATA_MNG_BASE_URL,
  contact: process.env.REACT_APP_CONTACT_BASE_URL,
  "public-1": process.env.REACT_APP_PUBLIC_API_1_BASE_URL,
} as const;

const baseURL = API_POOL["public-1"];
// const baseURL = 'https://401d-182-184-90-121.eu.ngrok.io';

const TOKEN_PAYLOAD_KEY = "authorization";

interface IAxiosRequest extends Partial<AxiosRequestConfig> {
  public?: boolean;
  handleError?: boolean;
  attachToken?: boolean;
  attachAccountId?: boolean;
}

const axiosRequest = axios.create({
  baseURL: baseURL,
  timeout: 60000,
});

axiosRequest.interceptors.request.use(
  (reqConfig: any) => {
    const { attachToken = true, attachAccountId = true, ...config } = reqConfig;

    if (attachToken) {
      const token = getLocalStorage("token", false);
      const jwtToken = `Bearer ${token}`;

      if (token) {
        config.headers && (config.headers[TOKEN_PAYLOAD_KEY] = jwtToken);
      }

      if (!jwtToken && !config.public) {
        Promise.reject("Attach a token in request or mark it public");
      }
    }

    if (attachAccountId) {
      const accountId = getLocalStorage("account-id", false);
      accountId && config.headers && (config.headers["account-id"] = accountId);
    }

    return config;
  },
  (error) => {
    // Do something with request error here
    // notification.error({
    // 	message: 'Error'
    // })
    Promise.reject(error);
  }
);

type CustomResponse = {
  success?: boolean;
  errorHandled?: boolean;
  reason?: string;
} & Partial<AxiosResponse>;

type RequestError = { response: CustomResponse };

const errorHandler = (error: RequestError): CustomResponse => {
  if (error instanceof axios.Cancel) {
    return {
      success: false,
      errorHandled: true,
      reason: "cancelled",
      ...error,
    };
  }

  const { response } = error;

  if (response && response.status && codeMessage[response.status]) {
    // if (response.status === 400) {
    //   notification.error({
    //     message: response.data?.message || codeMessage[response.status],
    //   });
    // }
    response.success = false;
    response.errorHandled = true;
    const errorText = codeMessage[response.status];
    return {
      ...response,
      success: false,
      errorHandled: true,
      reason: errorText,
    };
  } else if (!response) {
    return { success: false, errorHandled: true };
  }

  return { ...response, success: false, errorHandled: true, reason: "network" };
};

/**
 * Fetch data from given url
 * @param {*} url
 * @param {*} options
 *
 * Note Don't add anymore params if needed add a object type called 'extra' or something
 * can tell me what's the need for includeAuthHead?
 */
const request = async (
  url: string,
  options: IAxiosRequest = {
    handleError: true,
  }
) => {
  const handleError = options.handleError ?? true;
  try {
    const res = await axiosRequest(url, options);
    return res;
  } catch (e) {
    if (handleError) {
      throw errorHandler(e as RequestError);
    } else {
      throw e;
    }
  }
};

export default request;
