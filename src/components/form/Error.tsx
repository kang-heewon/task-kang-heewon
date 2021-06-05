import styled from "@emotion/styled";
import React from "react";

type Props = {
  children: string;
};
export function Error({ children }: Props) {
  return <Box>{children}</Box>;
}

const Box = styled.span`
  color: #f89429;
  font-size: 12px;
  margin-top: 4px;
`;
