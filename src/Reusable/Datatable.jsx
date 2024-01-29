import React, { useEffect, useRef } from "react";
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net';
import { useSelector } from "react-redux";

const Datatable = () => {
  const data = useSelector((state) => state?.AddInfoReducer);
  const dataTableRef = useRef(null);

  useEffect(() => {
    // Check if DataTable instance already exists and destroy it
    if ($.fn.DataTable.isDataTable("#example")) {
      dataTableRef.current.destroy();
    }

    // Initialize DataTable with dynamic data
    dataTableRef.current = $("#example").DataTable({
      data: data,
      columns: [
        { data: 'Name' },
        { data: 'Age' },
        { data: 'Sex' },
        { data: 'Mobile' },
        { data: 'IDtype' },
        { data: 'IssuedId' },
        { data: 'Address' },
        { data: 'State' },
        { data: 'City' },
        { data: 'Country' },
        { data: 'Pincode' },
      ],
    });

  }, [data]); // Update the DataTable when the data changes

  return (
    <table id="example" style={{backgroundColor:'#1a1a2e',color:'#ffffff'}}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Sex</th>
          <th>Mobile</th>
          <th>ID type</th>
          <th>ID Number</th>
          <th>Address</th>
          <th>State</th>
          <th>City</th>
          <th>Country</th>
          <th>Pincode</th>
        </tr>
      </thead>
      <tbody>
        {data.map((itm, index) => (
          <tr key={index}>
            <td>{itm?.Name}</td>
            <td>{itm?.Age}</td>
            <td>{itm?.Sex}</td>
            <td>{itm?.Mobile}</td>
            <td>{itm?.IDtype}</td>
            <td>{itm?.IssuedId}</td>
            <td>{itm?.Address}</td>
            <td>{itm?.State}</td>
            <td>{itm?.City}</td>
            <td>{itm?.Country}</td>
            <td>{itm?.Pincode}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Datatable;
