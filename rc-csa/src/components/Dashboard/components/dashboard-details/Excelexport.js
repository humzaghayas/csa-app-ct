import { Tooltip } from '@mui/material';
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';
import Button from '@mui/material/Button';

import PropTypes from 'prop-types';

const ExportExcel = ({ excelData, fileName }) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const exportToExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <>
      <Tooltip title="Download Excel">
        <Button
          variant="contained"
          onClick={(e) => exportToExcel(fileName)}
          style={{ cursor: 'pointer', fontSize: 14 ,backgroundColor:'#00b39e'}}
        >
          Generate
        </Button>
      </Tooltip>
    </>
  );
};

ExportExcel.propTypes = {
  excelData: PropTypes.any,
  fileName: PropTypes.string,
};

export default ExportExcel;
