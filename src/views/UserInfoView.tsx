import React from "react";
import { Label } from "../components/form/Label";
import { RadioInput } from "../components/input/RadioInput";
import { TextInput } from "../components/input/TextInput";
import { HStack } from "../components/layout/HStack";
import { VStack } from "../components/layout/VStack";
import { ColorText } from "../components/typography/ColorText";
import { Typography } from "../components/typography/Typography";
import {
  exactLength,
  onlyEnglishAndSpace,
  onlyKorean,
  onlyNumber,
  requiredSelect,
  tooLong,
  tooShort,
} from "../utils/formValidator";

const GENDER_OPTION = [
  { label: "남", value: "male" },
  { label: "여", value: "female" },
];
type Props = {
  userNumber: number;
};

export const UserInfoView = React.memo(({ userNumber }: Props) => {
  return (
    <VStack spacing={24}>
      <Typography size={24} weight={600}>
        여행자 <ColorText color="#2B96ED">{userNumber.toString()}</ColorText>
      </Typography>
      {userNumber === 1 && (
        <Typography size={18} color="#848C94">
          예약하시는 모든 분의 정보를 여권 상과 동일하게 기입해 주시기 바랍니다.
        </Typography>
      )}
      <HStack spacing={16}>
        <VStack spacing={8} width="100%">
          <Label>영문 이름</Label>
          <TextInput
            formId={"user_english_name" + userNumber}
            placeHolder="Gil dong"
            onTouchValidate={(value) =>
              onlyEnglishAndSpace(value) ?? tooShort(value, 2) ?? tooLong(value, 20)
            }
          />
        </VStack>
        <VStack spacing={8} width="100%">
          <Label>영문 성</Label>
          <TextInput
            formId={"user_english_parent_name" + userNumber}
            onTouchValidate={(value) =>
              onlyEnglishAndSpace(value) ?? tooShort(value, 2) ?? tooLong(value, 20)
            }
          />
        </VStack>
      </HStack>
      <VStack spacing={8} width="100%">
        <Label>한글 이름</Label>
        <TextInput
          formId={"user_korean_name" + userNumber}
          onTouchValidate={(value) => onlyKorean(value) ?? tooShort(value, 2) ?? tooLong(value, 20)}
        />
      </VStack>
      <VStack spacing={8} width="100%">
        <Label>성별</Label>
        <RadioInput
          formId={"user_gender" + userNumber}
          onTouchValidate={(value) => requiredSelect(value, "성별")}
          items={GENDER_OPTION}
        />
      </VStack>
      <VStack spacing={8} width="100%">
        <Label>생년월일</Label>
        <TextInput
          formId={"user_birth_date" + userNumber}
          placeHolder="YYMMDD"
          onTouchValidate={(value) =>
            onlyNumber(value) ?? exactLength(value, 6, "6자리의 생년월일을 입력해 주세요.(YYMMDD)")
          }
        />
      </VStack>
    </VStack>
  );
});
