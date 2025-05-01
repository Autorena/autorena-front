export const declineCity = (city: string): string => {
  const cityLower = city.toLowerCase();
  const lastChar = cityLower.slice(-1);
  const lastTwoChars = cityLower.slice(-2);

  const exceptions: Record<string, string> = {
    орел: "Орле",
    сочи: "Сочи",
    "петропавловск-камчатский": "Петропавловске-Камчатском",
    чебоксары: "Чебоксарах",
  };

  if (exceptions[cityLower]) {
    return exceptions[cityLower];
  }

  if (lastChar === "а" || lastChar === "я") {
    return city.slice(0, -1) + "е";
  }
  if (lastChar === "ь") {
    return city.slice(0, -1) + "и";
  }
  if (lastTwoChars === "ий") {
    return city.slice(0, -2) + "ии";
  }
  if (
    ["к", "н", "г", "в", "д", "л", "р", "т", "м", "п", "с", "б"].includes(
      lastChar
    )
  ) {
    return city + "е";
  }

  return city;
};
