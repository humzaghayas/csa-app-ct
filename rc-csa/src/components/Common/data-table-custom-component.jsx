import PropTypes, { object } from 'prop-types';
import { lazy,useEffect,useState } from 'react';
import { useIntl } from 'react-intl';


import {
  usePaginationState,
  useDataTableSortingState,
} from '@commercetools-uikit/hooks';

import DataTable from '@commercetools-uikit/data-table';
import DataTableManager, { UPDATE_ACTIONS, useSorting } from '@commercetools-uikit/data-table-manager';
import Spacings from '@commercetools-uikit/spacings';


const DataTableManagerCustom = (props) => {
  const intl = useIntl();
  const { page, perPage } = usePaginationState();

  const [rows,setRows] = useState();
  
  useEffect(()=>{
    setRows(props?.rows)
  },[props?.rows])

  const {
    sortedBy,
    sortDirection,
    onSortChange,
  } = useSorting(rows);

  const initialVisibleColumns = props?.columns;
  const initialHiddenColumns = []
  const initialColumnsState = [...initialVisibleColumns, ...initialHiddenColumns];

  const [tableData, setTableData] = useState({
    columns: initialColumnsState,
    visibleColumnKeys: initialVisibleColumns.map(({ key }) => key),
  });

  const [isCondensed, setIsCondensed] = useState(false);
  const [isWrappingText, setIsWrappingText] = useState(false);

  const tableSettingsChangeHandler = {
    [UPDATE_ACTIONS.COLUMNS_UPDATE]: (visibleColumnKeys) =>{

      console.log('visibleColumnKeys',visibleColumnKeys);
      console.log('visibleColumnKeys',props?.columns.filter(c => visibleColumnKeys.includes(c.key)));
      setTableData({
        ...tableData,
        visibleColumnKeys,
 
      });
    },
    [UPDATE_ACTIONS.IS_TABLE_CONDENSED_UPDATE]: setIsCondensed,
    [UPDATE_ACTIONS.IS_TABLE_WRAPPING_TEXT_UPDATE]: setIsWrappingText,
  };

  const displaySettings = {
    disableDisplaySettings:  false,
    isCondensed,
    isWrappingText,
  };

  const mappedColumns = tableData.columns.reduce(
    (columns, column) => ({
      ...columns,
      [column.key]: column,
    }),
    {}
  );

  const visibleColumns = tableData.visibleColumnKeys.map(
    (columnKey) => mappedColumns[columnKey]
  );

  const columnManager = {
   areHiddenColumnsSearchable: true,
    searchHiddenColumns: (searchTerm) => {
      setTableData({
        ...tableData,
        columns: initialColumnsState.filter(
            (column) =>
              tableData.visibleColumnKeys.includes(column.key) ||
              column.label
                .toLocaleLowerCase()
                .includes(searchTerm.toLocaleLowerCase())
          ),
      });
    },
    disableColumnManager: false,
    visibleColumnKeys: tableData.visibleColumnKeys,
    hideableColumns: tableData.columns,
  };

  console.log("Data table manager custom",props);
  console.log(props?.onSortChange ? "yes" : "no")
  return (
    <Spacings.Stack scale="xl">
      {rows ? 
        <Spacings.Stack scale="l">
         <DataTableManager 
            columns={visibleColumns}
            columnManager={columnManager}
            displaySettings={displaySettings}
            onSettingsChange={(action, nextValue) => {
                tableSettingsChangeHandler[action](nextValue);
            }}
            >
            <DataTable
              rows={rows}
              sortedBy={sortedBy}
              sortDirection={sortDirection}
              onSortChange={props?.onSortChange ? props?.onSortChange : onSortChange}
              onRowClick={(row)=>props?.onRowClick(row)}
              itemRenderer={props?.itemRenderer}
            />
          </DataTableManager>
        </Spacings.Stack>
      : <p>Loading...</p>}
    </Spacings.Stack>
  );
};
DataTableManagerCustom.displayName = 'DataTableManagerCustom';
DataTableManagerCustom.propTypes = {
  rows: PropTypes.arrayOf(object).isRequired,
  columns: PropTypes.arrayOf(object).isRequired,
  onRowClick : PropTypes.func.isRequired,
  onSortChange : PropTypes.func,
  itemRenderer : PropTypes.func
};

export default DataTableManagerCustom;
