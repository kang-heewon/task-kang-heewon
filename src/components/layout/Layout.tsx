import styled from "@emotion/styled";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export function Layout({ children }: Props) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
