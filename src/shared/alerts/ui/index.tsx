import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import style from "./index.module.css";

type Severity = "success" | "info" | "warning" | "error";

type Props = {
    title: string;
    text: string;
    severity: Severity;
}

export const DescriptionAlerts: React.FunctionComponent<Props> = ({ title, text, severity }) => {
 
  return (
    <Stack className={style.alert} sx={{ width: '100%' }} spacing={2}>
      <Alert severity={severity}>
        <AlertTitle>{title}</AlertTitle>
        {text}
      </Alert>
    </Stack>
  );
}


