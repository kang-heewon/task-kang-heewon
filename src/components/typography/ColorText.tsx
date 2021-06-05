import styled from "@emotion/styled";
import React from "react";

type Props = {
  color: string;
  children: string;
};
export function ColorText({ children, color }: Props) {
  return <Box color={color}>{children}</Box>;
}

const Box = styled.span<Props>`
  ${({ color }) => `color: ${color};`}
`;
