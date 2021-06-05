import styled from "@emotion/styled";
import React, { ReactNode } from "react";

type Props = {
  bottom?: number;
  top?: number;
  right?: number;
  left?: number;
  children?: ReactNode;
};
export function Spacing(props: Props) {
  return <Box {...props} />;
}

const Box = styled.div<Props>`
  ${({ bottom }) => bottom && `margin-bottom: ${bottom}px`}
  ${({ top }) => top && `margin-top: ${top}px`}
  ${({ left }) => left && `margin-left: ${left}px`}
  ${({ right }) => right && `margin-right: ${right}px`}
`;
