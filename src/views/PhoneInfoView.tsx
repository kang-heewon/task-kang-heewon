import React from "react";
import { Label } from "../components/form/Label";
import { TextInput } from "../components/input/TextInput";
import { HStack } from "../components/layout/HStack";
import { VStack } from "../components/layout/VStack";
import { Typography } from "../components/typography/Typography";
import { onlyEnglishAndSpace, onlyKorean, tooLong, tooShort } from "../utils/formValidator";

export const PhoneInfoView = React.memo(() => {
  return (
    <VStack spacing={12}>
      <Typography size={24} weight={600}>
        상세 핸드폰 정보
      </Typography>
      <Typography size={18} color="#848C94">
        예약하시는 모든 분의 정보를 여권 상과 동일하게 기입해 주시기 바랍니다.
      </Typography>
      <HStack spacing={16}>
        <VStack spacing={8} width="100%">
          <Label>영문 이름</Label>
          <TextInput
            formId={"user_english_name"}
            placeHolder="Gil dong"
            onTouchValidate={(value) =>
              onlyEnglishAndSpace(value) ?? tooShort(value, 2) ?? tooLong(value, 20)
            }
          />
        </VStack>
        <VStack spacing={8} width="100%">
          <Label>영문 성</Label>
          <TextInput
            formId={"user_english_parent_name"}
            onTouchValidate={(value) =>
              onlyEnglishAndSpace(value) ?? tooShort(value, 2) ?? tooLong(value, 20)
            }
          />
        </VStack>
      </HStack>
      <VStack spacing={8} width="100%">
        <Label>한글 이름</Label>
        <TextInput
          formId={"user_korean_name"}
          onTouchValidate={(value) => onlyKorean(value) ?? tooShort(value, 2) ?? tooLong(value, 20)}
        />
      </VStack>
    </VStack>
  );
});