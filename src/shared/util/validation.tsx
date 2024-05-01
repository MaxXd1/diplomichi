import { isValidEmail, validatePassword } from "./validateSchema";

export const validate = (currentValue: string, type: string, setValid?: React.Dispatch<React.SetStateAction<boolean>>) => {
  let valid = true;

  if (type === 'Email') {
    valid = isValidEmail(currentValue);
  } else if (type === "Password") {
    valid = validatePassword(currentValue)
  }
  
  if(setValid) {
    setValid(valid);
  }
};
