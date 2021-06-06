import React from "react";
import { Label } from "../components/form/Label";
import { TextArea } from "../components/input/TextArea";
import { VStack } from "../components/layout/VStack";
import { Typography } from "../components/typography/Typography";
import { requiredInput, tooLong } from "../utils/formValidator";

export const OtherArriveInfoView = React.memo(() => {
  return (
    <VStack spacing={12}>
      <Typography size={24} weight={600}>
        기타 예약 정보
      </Typography>
      <VStack spacing={8} width="100%">
        <Label>오시는 교통수단을 적어주세요.</Label>
        <TextArea
          formId={"user_vehicle"}
          placeHolder="답변을 입력해 주세요."
          onTouchValidate={(value) => requiredInput(value, "기타 예약 정보") ?? tooLong(value, 200)}
        />
      </VStack>
    </VStack>
  );
});
