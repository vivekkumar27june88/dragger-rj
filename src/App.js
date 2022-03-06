import { useState } from 'react';
import './App.css';

function App() {
  let [selectedRows, setSelectedRows] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });

  let [selectedColumns, setSelectedColumns] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });

  let [startingRow, setStartingRow] = useState(undefined);
  let [startingColumn, setStartingColumn] = useState(undefined);

  let [lastSelectedRow, setLastSelectedRow] = useState(undefined);
  let [lastSelectedColumn, setLastSelectedColumn] = useState(undefined);

  let onDragStart = (row, column) => {
    setStartingRow(row);
    setStartingColumn(column);

    setLastSelectedRow(row);
    setLastSelectedColumn(column);

    selectedRows[row] = true;
    selectedColumns[column] = true;
    setSelectedRows({ ...selectedRows });
    setSelectedColumns({ ...selectedColumns });
  };

  let onDragEnter = (row, column) => {
    if (column >= startingColumn) {
      for (let colIter = lastSelectedColumn; colIter > column; colIter--) {
        selectedColumns[colIter] = false;
      }
    }

    if (row >= startingRow) {
      for (let rowIter = lastSelectedRow; rowIter > row; rowIter--) {
        selectedRows[rowIter] = false;
      }
    }

    setLastSelectedColumn(column);
    setLastSelectedRow(row);

    selectedRows[row] = true;
    selectedColumns[column] = true;
    setSelectedRows({ ...selectedRows });
    setSelectedColumns({ ...selectedColumns });
  };

  let onDragEnd = () => {
    [1, 2, 3, 4, 5, 6].forEach((i) => {
      selectedRows[i] = false;
      selectedColumns[i] = false;
    });

    setSelectedRows({ ...selectedRows });
    setSelectedColumns({ ...selectedColumns });
  };

  return (
    <div className="root">
      {[1, 2, 3, 4, 5, 6].map((activeRow) => {
        return (
          <div className="row" key={`row-${activeRow}`}>
            {[1, 2, 3, 4, 5, 6].map((activeColumn) => (
              <div
                className={
                  selectedRows[activeRow] === true && selectedColumns[activeColumn] === true
                    ? 'blue box'
                    : 'box'
                }
                key={`cell-${activeRow}${activeColumn}`}
                onDragStart={() => onDragStart(activeRow, activeColumn)}
                onDragEnter={() => onDragEnter(activeRow, activeColumn)}
                onDragEnd={() => onDragEnd()}
              ></div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default App;
