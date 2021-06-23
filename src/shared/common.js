import regexifyString from "regexify-string";

export const emailCheck = (email) => {
  const result = regexifyString({
    input: email,
    pattern:
      /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-z])*.([a-zA-Z])*/g,
    decorator(match, index) {
      if (match) {
        return true;
      }
    },
  });

  return result.length > 1 ? true : false;
};
