import { FormEvent, ReactNode } from "react";
import styled from "styled-components";

const map = {
  primary: "button--primary",
  secondary: "button--secondary",
  tertiary: "button--tertiary",
};

type ButtonVariant = "primary" | "secondary" | "tertiary";

type ButtonProps = {
  variant: ButtonVariant;
  children?: ReactNode;
  onClick?: (e: FormEvent) => void;
};

const Button = styled.button`
  font-weight: 400;
  display: block;
  text-align: center;
  flex-shrink: 0;
  height: 32px;
  line-height: 30px;
  max-width: 200px;
  padding: 0 11px;
  background-color: transparent;
  box-sizing: border-box;
  border: 1px solid transparent;
  outline: none;
  border-radius: 6px;
  cursor: default;
  user-select: none;
`;

export const PrimaryButton = styled(Button)`
  background-color: ${({ theme }) => theme.color.bg.brand.value};
  color: ${({ theme }) => theme.color.text.onbrand.value};
`;

export const SecondaryButton = styled(Button)`
  background-color: ${({ theme }) => theme.color.bg.brand.secondary.value};
  color: ${({ theme }) => theme.color.text.onbrand.secondary.value};
`;

export const TertiaryButton = styled(Button)`
  background-color: ${({ theme }) => theme.color.bg.brand.tertiary.value};
  color: ${({ theme }) => theme.color.text.onbrand.tertiary.value};
`;
