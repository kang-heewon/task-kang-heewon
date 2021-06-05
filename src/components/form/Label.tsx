import styled from "@emotion/styled";
import React from "react";

type Props = {
  children: string;
};
export function Label({ children }: Props) {
  return <Box>{children}</Box>;
}

const Box = styled.label`
  color: #51575d;
  font-weight: 700;
  font-size: 20px;
`;
