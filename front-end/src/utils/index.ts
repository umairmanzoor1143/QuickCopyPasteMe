import _omit from "lodash/omit";
export function isValidUrl(url?: string) {
  const regex = new RegExp(
    /^(?:(?:https?):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
  );
  return regex.test(url || "");
}

export function addProtocol(url: string) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = "http://" + url;
  }
  return url;
}
export function generateArray(number: number, data?: any) {
  const length = Math.abs(Number(number)); // Convert the input to a positive number
  return Array.from({ length }, (_, index) =>
    data ? { ...data, id: index + 1 } : index
  );
}

export function getUrlParts(url: string | undefined) {
  if (url) {
    const vidUrl = new URL(addProtocol(url));
    const hostName = vidUrl.hostname;
    const protocol = vidUrl.protocol;
    const search = vidUrl.search;
    const pathname = vidUrl.pathname;
    let companyName = "";
    if (hostName) {
      if (hostName.includes("www")) {
        companyName = hostName.split(".")[1];
      } else {
        companyName = hostName.split(".")[0];
      }
    }
    return { hostName, companyName, protocol, search, pathname };
  }
  return {
    hostName: "",
    companyName: "",
    protocol: "",
    search: "",
    pathname: "",
  };
}

export function URLParts(url?: string) {
  let obj: {
    url: string;
    hostName: string;
    protocol: string;
    search: string;
    pathname: string;
  } = {
    url: "",
    hostName: "",
    protocol: "",
    search: "",
    pathname: "",
  };
  if (url) {
    const { hostName, protocol, search, pathname } = getUrlParts(url);

    obj = {
      url: `${protocol}//${hostName}${pathname}`,
      hostName,
      protocol,
      search,
      pathname,
    };
  }
  return obj;
}

export const EmailRegex =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * Loosely validate an email address.
 *
 * @param {string} string
 * @return {boolean}
 */
export function isEmail(string: unknown) {
  const isEmailCheck = EmailRegex.test(String(string));
  return isEmailCheck || "invalid email address";
}
export function isValidEmailSchema(string: unknown) {
  const isEmailCheck = EmailRegex.test(String(string));

  return isEmailCheck;
}

const passwordRegexPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const validatePassword = (value: unknown) => {
  return passwordRegexPattern.test(String(value)) || "Invalid password format";
};
export const validatePasswordSchema = (value: unknown) => {
  return passwordRegexPattern.test(String(value));
};
export const usernameRegexPattern = /^[a-zA-Z0-9_]{3,16}$/;
export const validateUsername = (value: unknown) => {
  const usernameValidationCheck = usernameRegexPattern.test(String(value));

  return usernameValidationCheck || "Invalid username format";
};
export const validateUsernameschema = (value: unknown) => {
  const usernameValidationCheck = usernameRegexPattern.test(String(value));

  return usernameValidationCheck;
};
export const setSearchParams = (
  params:
    | Record<string, string>
    | ((prev: Record<string, string>) => Record<string, string>)
) => {
  const url = new URL(window.location.href);
  const searchParams = url.searchParams;

  if (typeof params === "function") {
    params = params(Object.fromEntries(searchParams.entries()));
  }

  Object.entries(params)?.forEach(([key, value]) => {
    searchParams.set(key, value);
  });

  window.history.pushState(null, "", url.toString());
};
export const getSearchParams = () => {
  const url = new URL(window.location.href);
  return url.searchParams;
};

export const isArray = (args: any) => {
  return Array.isArray(args);
};

export function isEmpty<T extends Record<string, any>>(obj: T) {
  return Object.keys(obj || {})?.length === 0;
}
export function objectKeys<T extends Record<string, any>>(obj: T): (keyof T)[] {
  if (isEmpty(obj)) {
    return [];
  }
  return Object.keys(obj);
}

export function getLocalStorage(name: string, parse = true) {
  try {
    if (parse) {
      return JSON.parse(localStorage.getItem(name) || "{}");
    } else {
      return localStorage.getItem(name);
    }
  } catch (e) {
    return undefined;
  }
}

export function removeLocalStorage(name: string) {
  localStorage.removeItem(name);
}
export const normalizeObjectForAPI = <T>(
  object: T,
  omit: (keyof T)[] = [],
  ignore: (keyof T)[] = []
): Partial<T> => {
  return _omit(
    object as any,
    ["created_at", "slug", "updated_at", "id", "is_deleted", ...omit].filter(
      (item) => !ignore.includes(item as keyof T)
    )
  ) as Partial<T>;
};
export function setLocalStorage(name: string, value: any, strigify = true) {
  if (strigify) {
    return localStorage.setItem(name, JSON.stringify(value));
  } else {
    return localStorage.setItem(name, value);
  }
}
export const getUser = () => {
  return getLocalStorage("auth_user") as any;
};
export const attrAccept = (
  file: { name?: string; type?: string },
  acceptedFiles: string | string[]
): boolean => {
  if (file && acceptedFiles) {
    const acceptedFilesArray = Array.isArray(acceptedFiles)
      ? acceptedFiles
      : acceptedFiles.split(",");
    const fileName = file.name || "";
    const mimeType = (file.type || "").toLowerCase();
    const baseMimeType = mimeType.replace(/\/.*$/, "");

    return acceptedFilesArray.some((type) => {
      const validType = type.trim().toLowerCase();
      if (validType.charAt(0) === ".") {
        return fileName.toLowerCase().endsWith(validType);
      } else if (validType.endsWith("/*")) {
        // This is something like a image/* mime type
        return baseMimeType === validType.replace(/\/.*$/, "");
      }
      return mimeType === validType;
    });
  }
  return true;
};

export function getWindowPostion(event: any) {
  const scrolloffset = window.scrollY || window.pageYOffset;
  const totalHeight = event.target?.body?.scrollHeight;
  const isBottomReached = scrolloffset + window.innerHeight >= totalHeight;
  const isTopReached = scrolloffset === 0;
  return { isBottomReached, isTopReached };
}

export function getCSSPropertyValue(propertyValue: string) {
  if (!propertyValue) {
    return null;
  }
  return getComputedStyle(
    document.querySelector("body") as HTMLElement
  )?.getPropertyValue(propertyValue);
}
