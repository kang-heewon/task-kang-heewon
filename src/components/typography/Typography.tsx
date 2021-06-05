import styled from "@emotion/styled";
import React, { ReactNode } from "react";

type Props = {
  size: number;
  weight?: number;
  color?: string;
  children: ReactNode;
};
export function Typography({ children, color = "#000000", weight = 400, size }: Props) {
  return (
    <Box color={color} weight={weight} size={size}>
      {children}
    </Box>
  );
}

const Box = styled.div<Props>`
  ${({ size }) => `font-size: ${size}px;`}
  ${({ weight }) => `font-weight: ${weight};`}
  ${({ color }) => `color: ${color};`}
`;
