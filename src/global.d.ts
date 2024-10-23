type BreadcrumbLink = {
  href: string;
  label: string;
};

type LabelValueProps = {
  label: string | JSX.Element;
  value: string;
};

declare type UseQueryOption<Response, Override = Response> = {
  key?: QueryKey;
  useQueryConfig?: QueryConfig<Response, Override>;
  apiConfig?: AxiosRequestConfig;
};
