export const StringMappingToStatusCode = {
  HTTP_SUCCESS: 0,
  HTTP_SERVER_ERROR: 1000,
  HTTP_REQUEST_TIMEOUT: 1001,
  HTTP_BAD_REQUEST: 1002,
  HTTP_UNAUTHORIZED: 1003,
  HTTP_FORBIDDEN: 1004,
  HTTP_NOT_FOUND: 1005,
  HTTP_UNPROCESSABLE_ENTITY: 1006,
  HTTP_TOO_MANY_REQUESTS: 1007,
  HTTP_BAD_GATEWAY: 1008,
  HTTP_GATEWAY_TIMEOUT: 1009,
  MONGODB_DUPLICATE: 1100,
  RESOURCE_UPLOAD_IMAGE_ERROR: 1200,
  RESOURCE_UPLOAD_NOT_FOUND: 1201,
  CONTENT_MANAGER_UPDATE_ERROR: 1301,
  CONTENT_MANAGER_NOT_FOUND: 1302,
  DESTINATION_NOT_FOUND: 1400,
  DESTINATION_UPDATE_ERROR: 1401,
  DESTINATION_DUPLICATION: 1402,
  STAFF_NOT_FOUND: 1500,
  STAFF_FROM_GT_TO_TIME: 1501,
  STAFF_DAYOFF_OUT_RANGE: 1502,
  STAFF_MANAGER_EMAIL_DUPLICATE: 1503,
  STAFF_MANAGER_PHONE_DUPLICATE: 1504,
  STAFF_UPDATE_INFOMATION_ERROR: 1505,
  VEHICLE_NOT_FOUND: 1600,
  VEHICLE_UPDATE_ERROR: 1601,
  VEHICLE_EVENT_NOT_FOUND: 1602,
  VEHICLE_EVENT_UPDATE_ERROR: 1603,
  OFFICE_MANAGER_UPDATE_ERROR: 1701,
  OFFICE_MANAGER_NOT_FOUND: 1702,
  OFFICE_MANAGER_EMAIL_DUPLICATE: 1703,
  OFFICE_MANAGER_PHONE_DUPLICATE: 1704,
  PACKAGE_SETTING_MANAGER_UPDATE_ERROR: 1801,
  PACKAGE_SETTING_NOT_FOUND: 1802,
  PACKAGE_SETTING_TITLE_EXISTED: 1803,
  SERVICE_SETTING_MANAGER_UPDATE_ERROR: 1900,
  SERVICE_SETTING_NOT_FOUND: 1901,
  PASSENGER_NOT_FOUND: 2000,
  PASSENGER_REGISTER_ERROR: 2001,
  PASSENGER_VALIDATE_EMAIL_INVALID: 2002,
  PASSENGER_FORGOT_PASS_SESSION_INVALID: 2003,
  PASSENGER_FORGOT_PASS_OTP_NOT_EMPTY: 2004,
  PASSENGER_FORGOT_PASS_OTP_INVALID: 2005,
  PASSENGER_NEW_PW_INVALID: 2006,
  COMPANY_NOT_FOUND: 2100,
  COMPANY_UPDATE_ERROR: 2101,
  COMPANY_DOMAIN_IS_NOT_EXIST: 2102,
  RBAC_COMPANY_PASSWORD_ERROR: 2200,
  RBAC_ACCOUNT_NOT_FOUND: 2201,
  RBAC_FORGOT_PASS_SESSION_INVALID: 2202,
  RBAC_FORGOT_PASS_OTP_NOT_EMPTY: 2203,
  RBAC_FORGOT_PASS_OTP_INVALID: 2204,
  RBAC_NEW_PW_INVALID: 2205,
  SUBSCRIPTION_NOT_FOUND: 2300,
  SUBSCRIPTION_PLAN_NOT_FOUND: 2301,
  SUBSCRIPTION_NOT_ALLOW_UPDATED: 2302,
  SUBSCRIPTION_EXPIRED: 2303,
  SUBSCRIPTION_UPDATE_PAYMENT_ID_ERROR: 2304,
  ROUTE_ONE_TRIP_NOT_FOUND: 2400,
  ROUTE_FROM_GT_TO_TIME: 2401,
  ROUTE_MULTI_GT_TO_TIME: 2402,
  ROUTE_NOT_FOUND: 2403,
  ROUTE_ONE_TRIP_NOT_EXACT: 2404,
  ROUTE_UPDATE_PRICE_ERROR: 2405,
  ROUTE_REMOVE_ERROR: 2406,
  ROUTE_UPDATE_ERROR: 2407,
  ROUTE_DURATION_MUST_BE_ASC: 2408,
  PAYMENT_PAYPAL_CREATE_ORDER_ERROR: 2500,
  PAYMENT_PAYPAL_ORDER_NOT_FOUND: 2501,
  PAYMENT_PAYPAL_GEN_TOKEN_ERROR: 2502,
  PAYMENT_UPDATE_STATUS_ERROR: 2503,
  PAYMENT_NOT_FOUND: 2504,
  PAYMENT_CREATE_ERROR: 2505,
  PAYMENT_PAYPAL_CREATE_PAYOUT_ERROR: 2506,
  PAYMENT_PAYPAL_PAYOUT_NOT_FOUND: 2507,
  PAYMENT_STRIPE_CREATE_CHECK_OUT_ERROR: 2508,
  PAYMENT_STRIPE_CREATE_ACCOUNT_ERROR: 2509,
  PAYMENT_STRIPE_CREATE_ACCOUNT_LINK_ERROR: 2510,
  PAYMENT_STRIPE_TRANSFERS_LINK_ERROR: 2511,
  PACKAGE_SALE_DEPARTURE_TIME_INVALID: 2600,
  PACKAGE_SALE_POINT_INVALID: 2601,
  PACKAGE_SALE_PACKAGE_NOT_FOUND: 2602,
  PACKAGE_SALE_UPDATE_DELIVERY_ERROR: 2603,
  PACKAGE_SALE_ORDER_NOT_FOUND: 2604,
  PACKAGE_SALE_CANT_NOT_CANCEL: 2605,
  PACKAGE_SALE_CANT_NOT_UPDATE: 2606,
  TICKET_SALE_NOT_FOUND: 2700,
  TICKET_SALE_UPDATE_PAYMENT_ERROR: 2701,
  TICKET_SALE_CREATE_ERROR: 2702,
  TICKET_SALE_UPDATE_ERROR: 2703,
  SERVICE_SETTING_TITLE_EXISTED: 1902,
  PASSENGER_OLD_PW_INVALID: 2007,
  COMPANY_SUBCRIPTION_IS_EXPIRED: 2103,
  COMPANY_DOMAIN_IS_EXIST: 2104,
  RBAC_OLD_PW_INVALID: 2206,
  PAYMENT_PAYPAL_CONNECT_ERROR: 2512,
  PAYMENT_GW_NOT_CONNECTED: 2513,
  UNKNOWN: 99999999,
} as const;

type TStatusCode = Record<(typeof StringMappingToStatusCode)[keyof typeof StringMappingToStatusCode], keyof typeof StringMappingToStatusCode>;
export const StatusCodeMappingToString: TStatusCode = Object.fromEntries(
  Object.entries(StringMappingToStatusCode).map(([key, value]) => {
    return [value, key];
  }),
) as TStatusCode;
