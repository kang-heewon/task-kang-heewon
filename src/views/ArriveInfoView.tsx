import React from "react";
import { Select } from "../components/input/Select";
import { HStack } from "../components/layout/HStack";
import { VStack } from "../components/layout/VStack";
import { Typography } from "../components/typography/Typography";
import { requiredSelect } from "../utils/formValidator";
import { generateSizeArray } from "../utils/generateSizeArray";

const HOUR_OPTION = generateSizeArray(24).map((_, index) => ({
  label: `${index}시`,
  value: index.toString(),
}));
const MINUTE_OPTION = generateSizeArray(60).map((_, index) => ({
  label: `${index}분`,
  value: index.toString(),
}));

export const ArriveInfoView = React.memo(() => {
  return (
    <VStack spacing={12}>
      <Typography size={24} weight={600}>
        숙소 도착 예정 시간
      </Typography>
      <Typography size={18} color="#848C94">
        예약하시는 모든 분의 정보를 여권 상과 동일하게 기입해 주시기 바랍니다.
      </Typography>
      <HStack spacing={16}>
        <Select
          formId={"arrive_hour"}
          placeHolder="시"
          onTouchValidate={(value) => requiredSelect(value, "시")}
          items={HOUR_OPTION}
        />
        <Select
          formId={"arrive_minute"}
          placeHolder="분"
          onTouchValidate={(value) => requiredSelect(value, "분")}
          items={MINUTE_OPTION}
        />
      </HStack>
    </VStack>
  );
});
