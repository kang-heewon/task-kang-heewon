import styled from "@emotion/styled";
import React, { ButtonHTMLAttributes, ReactNode } from "react";

const BUTTON_KIND_MAP = {
  primary: {
    border: "1px solid #51abf3",
    backgroundColor: "#51abf3",
    color: "#fff",
    focusShadowColor: "#a7d4f9",
    hoverBoxShadow: "0 1px 3px 0 rgb(0 0 0 / 30%)",
    hoverBackground: "#2b96ed",
  },
  secondary: {
    border: "1px solid #e9ecef",
    backgroundColor: "#e9ecef",
    color: "#495056",
    focusShadowColor: "#f5f6f7",
    hoverBoxShadow: "0 1px 3px 0 rgb(0 0 0 / 20%)",
    hoverBackground: "#dee2e6",
  },
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  kind: keyof typeof BUTTON_KIND_MAP;
};

export function Button({ children, kind, type = "button", ...rest }: Props) {
  return (
    <Box
      border={BUTTON_KIND_MAP[kind].border}
      backgroundColor={BUTTON_KIND_MAP[kind].backgroundColor}
      color={BUTTON_KIND_MAP[kind].color}
      hoverBackground={BUTTON_KIND_MAP[kind].hoverBackground}
      hoverBoxShadow={BUTTON_KIND_MAP[kind].hoverBoxShadow}
      focusShadowColor={BUTTON_KIND_MAP[kind].focusShadowColor}
      type={type}
      {...rest}
    >
      {children}
    </Box>
  );
}

const Box = styled.button<{
  border: string;
  backgroundColor: string;
  color: string;
  hoverBackground: string;
  hoverBoxShadow: string;
  focusShadowColor: string;
}>`
  border: ${({ border }) => border};
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  cursor: pointer;
  height: 40px;
  font-size: 14px;
  line-height: 38px;
  text-align: center;
  border-radius: 4px;
  min-width: 120px;
  transition: all 0.08s ease;

  :hover {
    background-color: ${({ hoverBackground }) => hoverBackground};
    box-shadow: ${({ hoverBoxShadow }) => hoverBoxShadow};
  }
  :focus {
    background-color: ${({ backgroundColor }) => backgroundColor};
    box-shadow: 0 0 0 3px ${({ focusShadowColor }) => focusShadowColor};
    outline: none;
  }
`;
