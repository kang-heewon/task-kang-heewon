import styled from "@emotion/styled";
import React, { ReactNode } from "react";
import { Spacing } from "./Spacing";

const VERTICAL_SPACING_MAP = {
  around: "space-around",
  between: "space-between",
};

const HORIZONTAL_ALIGNMENT_MAP = {
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
  flex?: number;
};

export function VStack({ children, spacing, alignment = "stretch", width, flex }: Props) {
  return (
    <Box
      width={width}
      justifyContent={typeof spacing === "string" ? VERTICAL_SPACING_MAP[spacing] : undefined}
      alignItems={HORIZONTAL_ALIGNMENT_MAP[alignment]}
      flex={flex}
    >
      {children.map((child, index) =>
        typeof spacing === "number" && index !== 0 ? (
          <React.Fragment key={index}>
            <Spacing top={spacing} />
            {child}
          </React.Fragment>
        ) : (
          child
        )
      )}
    </Box>
  );
}

const Box = styled.div<{
  width?: string;
  justifyContent?: string;
  alignItems?: string;
  flex?: number;
}>`
  ${({ width }) => width && `width: ${width};`}
  display: flex;
  flex-direction: column;
  ${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent};`}
  ${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
  ${({ flex }) => flex && `flex: ${flex};`}
`;
