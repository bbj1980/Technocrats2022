import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import QuizOverview from "../admindashboard/BlogOverview"
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { userActions } from '../../redux/_actions/user.actions';
// import { CelsiorGrid } from 'celsior-grid';
// import 'celsior-grid/styles/celsior-grid.css';
// import 'celsior-grid/styles/celsior-theme-default.css';
const getValue = (inputSelector) => {
  var text = document.querySelector(inputSelector).value;
  switch (text) {
    case 'none':
      return;
    case 'tab':
      return '\t';
    default:
      return text;
  }
};

const getParams = () => {
  return {
    columnSeparator: getValue('#columnSeparator'),
  };
};
const AdminDashboard = () => {
  const showgrid = true;
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'firstName', filter: true, editable: true
    },
    {
      field: 'lastName', filter: true, editable: true
    },
    { field: 'role', filter: true }
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true
  }));

  // Example of consuming Grid Event
  const cellClickedListener = useCallback(event => {
    console.log('cellClicked', event);
  }, []);


  // Example using Grid's API
  const buttonListener = useCallback(e => {
    gridRef.current.api.deselectAll();
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.getAll());
  }, []);
  const onBtnExport = useCallback(() => {
    var params = getParams();
    if (params.columnSeparator) {
      alert(
        'NOTE: you are downloading a file with non-standard separators - it may not render correctly in Excel.'
      );
    }
    gridRef.current.api.exportDataAsCsv(params);
  }, [alert]);

  const getParams = () => {
    return {
      columnSeparator: getValue('#columnSeparator'),
    };
  };
  const onBtnUpdate = useCallback(() => {
    document.querySelector(
      '#csvResult'
    ).value = gridRef.current.api.getDataAsCsv(getParams());
  }, []);
  // function handleDeleteUser(id) {
  //   dispatch(userActions.delete(id));
  // }
  // Create table headers consisting of 4 columns.
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },

  ];

  const users = useSelector(state => state.users);
  const [valid, setValid] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const passwordRequirements = [
    {
      text: 'Must be at least 8 characters',
      validator: val => val.length >= 8,
    },
    {
      text: 'Must contain at least one number',
      validator: val => /\d/g.test(val),
    },
    {
      text: 'Must contain at least one lower-case letter',
      validator: val => /[a-z]/g.test(val),
    },
    {
      text: 'Must contain at least one upper-case letter',
      validator: val => /[A-Z]/g.test(val),
    }
  ];

  return (<>
    <QuizOverview></QuizOverview>
    {/* <div className="row">
            <div className="column"><label>columnSeparator = </label></div>
            <div>
            <select id="columnSeparator">
              <option value="none">(default)</option>
              <option value="tab">tab</option>
              <option value="|">bar (|)</option>
            </select></div>
        </div>
            <div style={{ margin: '10px 0' }}>
          <button onClick={onBtnExport}>Download CSV export file</button>
        </div>
            <div className="ag-theme-alpine" style={{width: 1000, height: 500}}>

            {users.loading && <em>Loading users...</em>}
            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
        
            {users.items &&
            <AgGridReact
            ref={gridRef} // Ref for accessing Grid's API
 
            rowData={users.items} // Row Data for Rows
 
            columnDefs={columnDefs} // Column Defs for Columns
            defaultColDef={defaultColDef} // Default Column Properties
            pagination={true}
            paginationPageSize={2}
            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
            rowSelection='multiple' // Options - allows click selection of rows 
            onCellClicked={cellClickedListener} // Optional - registering for Grid Event
            />}

               </div> */}
  </>);
};

export default AdminDashboard;