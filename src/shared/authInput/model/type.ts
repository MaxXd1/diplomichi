export type Props = {
    type: string;
    value: string;
    placeholder: string;
    isValidation?:boolean;
    setValue:React.Dispatch<React.SetStateAction<string>>;
    setValid?:React.Dispatch<React.SetStateAction<boolean>>;
}
