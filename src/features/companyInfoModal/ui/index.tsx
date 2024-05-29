import { useSelector } from "react-redux";
import { Modal, Box, Typography, Button } from "@mui/material";
import { companyInfoSelector } from "@app/store/companyInfo";
import { RootState } from "@app/store/";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const CompanyInfoModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const company = useSelector((state: RootState) => companyInfoSelector(state));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-title" variant="h6" component="h2">
          Информация о компании
        </Typography>
        <Typography variant="body1"><strong>Название компании:</strong> {company.compName}</Typography>
        <Typography variant="body1"><strong>Адрес:</strong> {company.compAddress}</Typography>
        <Typography variant="body1"><strong>Юридический адрес:</strong> {company.compLegalAddress}</Typography>
        <Typography variant="body1"><strong>Дата основания:</strong> {formatDate(company.compFoundationDate)}</Typography>
        <Typography variant="body1"><strong>Веб-сайт:</strong> {company.compWebsite}</Typography>
        <Typography variant="body1"><strong>Сфера деятельности:</strong> {company.compFieldOfActivity}</Typography>
        <Typography variant="body1"><strong>Регистрационный номер:</strong> {company.compRegistrationNumber}</Typography>
        <Typography variant="body1"><strong>VAT:</strong> {company.compVAT}</Typography>
        <Button onClick={onClose} color="primary" variant="contained" sx={{ mt: 2 }}>
          Закрыть
        </Button>
      </Box>
    </Modal>
  );
};
