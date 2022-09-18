import { ReactNode } from "react";

type TextVariant = "sm" | "md" | "lg" | "xl" | "bold" | "inverse";

const map = {
  sm: "type--small",
  md: "type--large",
  lg: "type--xlarge",
  xl: "type--medium",
  bold: "type--bold",
  inverse: "type--inverse",
};

type TextProps = {
  variant: TextVariant;
  children?: ReactNode;
};

export const Text = ({ variant, children }: TextProps) => (
  <div className={`variant ${map[variant]}`}>{children}</div>
);
