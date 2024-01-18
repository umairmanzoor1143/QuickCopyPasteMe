import qs from "query-string";
import request, { API_POOL } from "../utils/request";

class Model<ModelType = any> {
  private endpoint: string;
  private baseUrl = API_POOL["public-1"];

  constructor(endpoint: string, apiPoolName?: keyof typeof API_POOL) {
    this.endpoint = endpoint;
    if (apiPoolName) {
      this.baseUrl = API_POOL[apiPoolName];
    }
  }

  async sendRequest<DataType>(
    path: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    data?: unknown
  ) {
    const res = await request(`${this.endpoint}${path}`, {
      method,
      data,
      baseURL: this.baseUrl,
    });

    return res.data as ApiResponse<DataType>;
  }

  async get<ReturnType = ModelType>(
    slug: string,
    options?: { query?: Record<string, any>; path?: string }
  ) {
    return await this.sendRequest<ReturnType>(
      `${options?.path ? `/${options.path}` : ""}/${slug}${
        options?.query ? `?${qs.stringify(options.query)}` : ``
      }`,
      "GET"
    );
  }

  async list<ReturnType = ModelType>(options?: {
    query?: Record<string, any>;
    path?: string;
  }) {
    const cursor = options?.query?.cursor;
    if (options?.query?.cursor && typeof cursor === "object") {
      options.query.cursor = JSON.stringify(options.query.cursor);
    }
    return await this.sendRequest<ReturnType[]>(
      `${options?.path ? `/${options.path}` : ""}${
        options?.query ? `?${qs.stringify(options.query)}` : ``
      }`,
      "GET"
    );
  }

  async create<ReturnType = ModelType>(
    data: Partial<ModelType>,
    options?: {
      query?: Record<string, any>;
      path?: string;
    }
  ) {
    return await this.sendRequest<ReturnType>(
      `${options?.path ? `/${options.path}` : ""}${
        options?.query ? `?${qs.stringify(options.query)}` : ``
      }`,
      "POST",
      data
    );
  }

  async update<ReturnType = ModelType>(
    slug: string,
    data: Partial<ModelType>,
    options?: {
      query?: Record<string, any>;
      path?: string;
    }
  ) {
    return await this.sendRequest<ReturnType>(
      `${options?.path ? `/${options.path}` : ""}/${slug}${
        options?.query ? `?${qs.stringify(options.query)}` : ``
      }`,
      "PUT",
      data
    );
  }

  async delete<ReturnType = void>(
    slug: string,
    options?: {
      query?: Record<string, any>;
      path?: string;
    }
  ) {
    return await this.sendRequest<ReturnType>(
      `${options?.path ? `/${options.path}` : ""}/${slug}${
        options?.query ? `?${qs.stringify(options.query)}` : ``
      }`,
      "DELETE"
    );
  }
}

export default Model;
