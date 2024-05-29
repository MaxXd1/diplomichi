export type Props<T> = {
    type: string;
    value?: string;
    placeholder: string;
    isValidation?:boolean;
    setValue:(data:T)=> void;
    setValid?:React.Dispatch<React.SetStateAction<boolean>>;
}
