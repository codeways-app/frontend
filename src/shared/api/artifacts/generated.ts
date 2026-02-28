/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ChatDto {
  additionalInfo: string;
  messages: MessageDto[];
  title: string;
}

export interface ChatItemDto {
  id: string;
  lastMessage: MessageDto;
  title: string;
  unreadCount: number;
}

export interface ConnectResponseDto {
  /** @example "https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=..." */
  url: string;
}

export interface EmailDto {
  /**
   * User email
   * @example "user12345@gmail.com"
   */
  email: string;
}

export interface LoginDto {
  /**
   * User login
   * @example "user"
   */
  login: string;
  /**
   * User password
   * @example "password"
   */
  password: string;
}

export interface MessageDto {
  content: string;
  createdAt: string;
  id: string;
  senderId: string;
  status: "SENT" | "DELIVERED" | "READ";
  text: string;
  updatedAt: string;
}

export interface RecoverDto {
  /**
   * User email
   * @example "user@example.com"
   */
  email: string;
  /**
   * User password
   * @example "password"
   */
  password: string;
  /**
   * Register token
   * @example "token"
   */
  token: string;
}

export interface RegisterDto {
  /**
   * User email
   * @example "user@example.com"
   */
  email: string;
  /**
   * User login
   * @example "user"
   */
  login: string;
  /**
   * User password
   * @example "password"
   */
  password: string;
  /**
   * Register token
   * @example "token"
   */
  token: string;
}

export interface TokensResponse {
  /** JWT token */
  accessToken: string;
}

export interface TwoFactorDto {
  /**
   * User login
   * @example "user"
   */
  login: string;
  /**
   * Two-Factor Token
   * @example "665092"
   */
  token: string;
}

export interface VerifyDto {
  /**
   * User email
   * @example "email"
   */
  email: string;
  /**
   * Email token
   * @example "token"
   */
  token: string;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type ? { "Content-Type": type } : {}),
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path,
      })
      .then((response) => response.data);
  };
}

/**
 * @title My API
 * @version 1.0.0
 * @contact
 *
 * API Documentation
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerCallback
     * @request GET:/api/auth/oauth/callback/{provider}
     * @response `200` `TokensResponse` User successful logined
     */
    authControllerCallback: (
      provider: string,
      query: {
        code: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<TokensResponse, any>({
        path: `/api/auth/oauth/callback/${provider}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerConnect
     * @request GET:/api/auth/oauth/connect/{provider}
     * @response `200` `ConnectResponseDto` User successful logined
     */
    authControllerConnect: (provider: string, params: RequestParams = {}) =>
      this.request<ConnectResponseDto, any>({
        path: `/api/auth/oauth/connect/${provider}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerLogin
     * @summary User login
     * @request POST:/api/auth/login
     * @response `200` `TokensResponse` User successful logined
     * @response `401` `void` Invalid login or password
     */
    authControllerLogin: (data: LoginDto, params: RequestParams = {}) =>
      this.request<TokensResponse, void>({
        path: `/api/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerRecover
     * @summary Step 3: Complete recover and set new password
     * @request POST:/api/auth/recover/new-password
     * @response `200` `TokensResponse` Password successfully reseted
     * @response `400` `void` Validation error
     */
    authControllerRecover: (data: RecoverDto, params: RequestParams = {}) =>
      this.request<TokensResponse, void>({
        path: `/api/auth/recover/new-password`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerRegister
     * @summary Step 3: Complete registration and create account
     * @request POST:/api/auth/register
     * @response `200` `TokensResponse` Account successfully registered
     * @response `400` `void` Validation error
     * @response `409` `void` Login already exists
     */
    authControllerRegister: (data: RegisterDto, params: RequestParams = {}) =>
      this.request<TokensResponse, void>({
        path: `/api/auth/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerSendRecoverToken
     * @summary Step 1: Enter email & send recover Token
     * @request POST:/api/auth/recover/send-code
     * @response `200` `void` Recover Token was successfully sent to the email.
     * @response `404` `void` Email does not exist
     * @response `409` `void` This account uses social login
     */
    authControllerSendRecoverToken: (
      data: EmailDto,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/auth/recover/send-code`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerSendVerificationToken
     * @summary Step 1: Enter email & send Verification Token
     * @request POST:/api/auth/register/send-code
     * @response `200` `void` Verification Token was successfully sent to the email.
     * @response `409` `void` Email already exists
     */
    authControllerSendVerificationToken: (
      data: EmailDto,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/auth/register/send-code`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerTwoFactor
     * @summary Two-Factor Verification
     * @request POST:/api/auth/login/two-factor
     * @response `200` `TokensResponse` Two-Factor Token successful verified
     * @response `401` `void` Invalid Verification Token
     */
    authControllerTwoFactor: (data: TwoFactorDto, params: RequestParams = {}) =>
      this.request<TokensResponse, void>({
        path: `/api/auth/login/two-factor`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerVerifyEmail
     * @summary Step 2: Verify email with received Token
     * @request POST:/api/auth/register/verify-email
     * @response `200` `void` Email successfully verified.
     * @response `400` `void` Invalid verification Token.
     */
    authControllerVerifyEmail: (data: VerifyDto, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/auth/register/verify-email`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerVerifyRecover
     * @summary Step 2: Verify recover with received Token
     * @request POST:/api/auth/recover/verify-recover
     * @response `200` `void` Recover successfully verified.
     * @response `400` `void` Invalid verification Token.
     */
    authControllerVerifyRecover: (
      data: VerifyDto,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/auth/recover/verify-recover`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  chats = {
    /**
     * No description
     *
     * @tags chats
     * @name ChatControllerGetChatById
     * @summary Get chat messages
     * @request GET:/api/chats/{id}
     * @response `200` `ChatDto` User chat messages
     * @response `401` `void` Unauthorized.
     * @response `403` `void` Forbidden.
     */
    chatControllerGetChatById: (id: string, params: RequestParams = {}) =>
      this.request<ChatDto, void>({
        path: `/api/chats/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags chats
     * @name ChatControllerGetMyChats
     * @summary Get all chats of current user
     * @request GET:/api/chats
     * @response `200` `(ChatItemDto)[]` List of user's chats
     * @response `401` `void` Unauthorized.
     */
    chatControllerGetMyChats: (params: RequestParams = {}) =>
      this.request<ChatItemDto[], void>({
        path: `/api/chats`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
