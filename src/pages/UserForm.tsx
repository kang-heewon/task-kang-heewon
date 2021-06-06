import styled from "@emotion/styled";
import React, { useCallback, useState } from "react";
import { Button } from "../components/button/Button";
import { Divider } from "../components/form/Divider";
import { HStack } from "../components/layout/HStack";
import { Spacing } from "../components/layout/Spacing";
import { VStack } from "../components/layout/VStack";
import { FormProvider } from "../contexts/FormContext";
import { generateSizeArray } from "../utils/generateSizeArray";
import { ArriveInfoView } from "../views/ArriveInfoView";
import { OtherArriveInfoView } from "../views/OtherArriveInfoView";
import { PhoneInfoView } from "../views/PhoneInfoView";
import { UserInfoView } from "../views/UserInfoView";

export function UserForm() {
  const [userCount, setUserCount] = useState(1);

  const increaseUserCount = useCallback(() => {
    setUserCount((prev) => prev + 1);
  }, []);
  const decreaseUserCount = useCallback(() => {
    setUserCount((prev) => (prev - 1 === 0 ? 1 : prev - 1));
  }, []);
  const handleSubmit = useCallback((values) => console.log(values), []);

  return (
    <Container>
      <Spacing top={24} />
      <FormProvider initialValues={{ name: "helo" }} onSubmit={handleSubmit}>
        <VStack spacing={38}>
          {generateSizeArray(userCount).map((_, index) => (
            <React.Fragment key={index}>
              {index !== 0 && <Spacing top={38} />}
              <UserInfoView userNumber={index + 1} />
              <Spacing bottom={24} />
              <Divider />
            </React.Fragment>
          ))}
          <ArriveInfoView />
          <Spacing bottom={24} />
          <Divider />
          <PhoneInfoView />
          <Spacing bottom={24} />
          <Divider />
          <OtherArriveInfoView />
          <Spacing bottom={24} />
          <Divider />
          <HStack spacing={4}>
            <Button kind="primary" onClick={increaseUserCount}>
              사용자 추가
            </Button>
            <Button kind="secondary" onClick={decreaseUserCount}>
              사용자 삭제
            </Button>
          </HStack>
          <Button kind="primary" type="submit">
            결제하기
          </Button>
        </VStack>
      </FormProvider>
    </Container>
  );
}

const Container = styled.div`
  max-width: 750px;
`;
