import styled from "@emotion/styled";
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { Label } from "../components/form/Label";
import { HStack } from "../components/layout/HStack";
import { VStack } from "../components/layout/VStack";
import { Typography } from "../components/typography/Typography";

export const AgreementView = React.memo(
  ({ setCanSubmit }: { setCanSubmit: Dispatch<SetStateAction<boolean>> }) => {
    const [travlerAgree, setTravlerAgree] = useState<boolean>(false);
    const [adsAgree, setAdsAgree] = useState<boolean>(false);

    const handleChange = useCallback(
      (halndler: Dispatch<SetStateAction<boolean>>) => () => halndler((prev) => !prev),
      []
    );
    const handleToogleTotalAgree = useCallback(() => {
      console.log(adsAgree, travlerAgree);
      const total = travlerAgree && adsAgree;
      setTravlerAgree(!total);
      setAdsAgree(!total);
    }, [adsAgree, travlerAgree]);

    useEffect(() => {
      if (travlerAgree) {
        setCanSubmit(true);
      } else {
        setCanSubmit(false);
      }
    }, [setCanSubmit, travlerAgree]);

    return (
      <VStack spacing={12}>
        <Typography size={24} weight={600}>
          약관 동의
        </Typography>
        <VStack spacing={8} width="100%">
          <Label>전체 약관 동의</Label>
          <HStack>
            <Check
              type="checkbox"
              checked={travlerAgree && adsAgree}
              onChange={handleToogleTotalAgree}
            />
            <div>전체 약관 동의</div>
          </HStack>
          <BorderedBox>
            <VStack spacing={8}>
              <HStack>
                <Check
                  type="checkbox"
                  checked={travlerAgree}
                  onChange={handleChange(setTravlerAgree)}
                />
                <div>여행자 약관 동의(필수)</div>
              </HStack>
              <HStack>
                <Check type="checkbox" checked={adsAgree} onChange={handleChange(setAdsAgree)} />
                <div>특가 항공권 및 할인 혜택 안내 동의 (선택)</div>
              </HStack>
            </VStack>
          </BorderedBox>
        </VStack>
      </VStack>
    );
  }
);

const Check = styled.input`
  width: 24px;
  height: 24px;
`;

const BorderedBox = styled.div`
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 16px;
`;
