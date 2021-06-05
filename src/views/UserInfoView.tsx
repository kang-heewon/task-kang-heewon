import React from "react";
import { Label } from "../components/form/Label";
import { TextInput } from "../components/input/TextInput";
import { HStack } from "../components/layout/HStack";
import { VStack } from "../components/layout/VStack";
import { ColorText } from "../components/typography/ColorText";
import { Typography } from "../components/typography/Typography";

type Props = {
  userNumber: number;
};

export function UserInfoView({ userNumber }: Props) {
  return (
    <VStack spacing={12}>
      <Typography size={24} weight={600}>
        여행자 <ColorText color="#2B96ED">{userNumber.toString()}</ColorText>
      </Typography>
      <Typography size={18} color="#848C94">
        예약하시는 모든 분의 정보를 여권 상과 동일하게 기입해 주시기 바랍니다.
      </Typography>
      <HStack spacing={16}>
        <VStack spacing={8} width="100%">
          <Label>영문 이름</Label>
          <TextInput formId={"user_name" + userNumber} placeHolder="Gil dong" />
        </VStack>
        <VStack spacing={8} width="100%">
          <Label>영문 성</Label>
          <TextInput formId={"user_parent_name" + userNumber} />
        </VStack>
      </HStack>
      <TextInput formId="hello" />
      <TextInput formId="bye" />
    </VStack>
  );
}
