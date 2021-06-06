import React from "react";
import { Label } from "../components/form/Label";
import { Select } from "../components/input/Select";
import { TextInput } from "../components/input/TextInput";
import { HStack } from "../components/layout/HStack";
import { VStack } from "../components/layout/VStack";
import { Typography } from "../components/typography/Typography";
import { onlyKorean, onlyNumber, tooLong, tooShort } from "../utils/formValidator";
const PHONE_OPTION = [{ label: "+82(대한민국)", value: "KR" }];

export const PhoneInfoView = React.memo(() => {
  return (
    <VStack spacing={24}>
      <Typography size={24} weight={600}>
        상세 핸드폰 정보
      </Typography>
      <VStack spacing={8} width="100%">
        <Label>사용자 이름</Label>
        <TextInput
          formId={"user_name"}
          placeHolder="홍길동"
          onTouchValidate={(value) => onlyKorean(value) ?? tooShort(value, 2) ?? tooLong(value, 20)}
        />
      </VStack>
      <VStack spacing={8} width="100%">
        <Label>핸드폰 번호</Label>
        <HStack>
          <Select formId={"user_phone_country_code"} items={PHONE_OPTION} flex={3} />
          <TextInput
            formId={"user_phone"}
            placeHolder="'-'없이 입력해주세요."
            onTouchValidate={(value) =>
              onlyNumber(value) ?? tooShort(value, 2) ?? tooLong(value, 20)
            }
            flex={7}
          />
        </HStack>
      </VStack>
    </VStack>
  );
});
