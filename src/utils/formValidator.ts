export const tooShort = (value: string, length: number) => {
  if (value.length < length) {
    return `최소 ${length}자 이상 입력해주세요.`;
  }
};

export const tooLong = (value: string, length: number) => {
  if (value.length > length) {
    return `최대 ${length}자까지 입력 가능합니다.`;
  }
};

const englishAndSpacingRegex = /^[a-zA-Z ]*$/;
export const onlyEnglishAndSpace = (value: string) => {
  if (!englishAndSpacingRegex.test(value)) {
    return `영어와 띄어쓰기만 입력 가능합니다.`;
  }
};

const koreanRegex = /^[ㄱ-ㅎ|가-힣]*$/;
export const onlyKorean = (value: string) => {
  if (!koreanRegex.test(value)) {
    return `한글만 입력 가능합니다.`;
  }
};

export const requiredSelect = (value: string, label: string) => {
  if (!value) {
    return `${label}을 선택해주세요.`;
  }
};
