import styled from "@emotion/styled";
import React, { ReactNode } from "react";
import { Spacing } from "./Spacing";

const HORIZONTAL_SPACING_MAP = {
  around: "space-around",
  between: "space-between",
};

const VERTICAL_ALIGNMENT_MAP = {
  stretch: "stretch",
  top: "flex-start",
  bottom: "flex-end",
  center: "center",
};

type Props = {
  width?: string;
  children: ReactNode[];
  alignment?: "stretch" | "top" | "bottom" | "center";
  spacing?: number | "around" | "between";
};

export function HStack({ children, spacing, alignment = "stretch", width }: Props) {
  return (
    <Box
      width={width}
      justifyContent={typeof spacing === "string" ? HORIZONTAL_SPACING_MAP[spacing] : undefined}
      alignItems={VERTICAL_ALIGNMENT_MAP[alignment]}
    >
      {children.map((child, index) =>
        typeof spacing === "number" && index !== 0 ? (
          <React.Fragment key={index}>
            <Spacing left={spacing}></Spacing>
            {child}
          </React.Fragment>
        ) : (
          child
        )
      )}
    </Box>
  );
}

const Box = styled.div<{ width?: string; justifyContent?: string; alignItems?: string }>`
  ${({ width }) => width && `width: ${width};`}
  display: flex;
  flex-direction: row;
  ${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent};`}
  ${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
`;
