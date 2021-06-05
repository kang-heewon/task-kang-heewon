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
  children: ReactNode[];
  alignment: "stretch" | "top" | "bottom" | "center";
  spacing?: number | "around" | "between";
};

export function VStack({ children, spacing, alignment = "stretch" }: Props) {
  return (
    <Box
      justifyContent={typeof spacing === "string" ? VERTICAL_SPACING_MAP[spacing] : undefined}
      alignItems={HORIZONTAL_ALIGNMENT_MAP[alignment]}
    >
      {children.map((child, index) =>
        typeof spacing === "number" && index !== 0 ? (
          <Spacing left={spacing}>{child}</Spacing>
        ) : (
          child
        )
      )}
    </Box>
  );
}

const Box = styled.div<{ justifyContent?: string; alignItems?: string }>`
  display: flex;
  flex-direction: row;
`;
