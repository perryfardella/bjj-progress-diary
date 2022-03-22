import Link from "next/link";
import React, { useEffect, useState } from "react";

const Record = (props: any) => (
  <tr>
    <td>{props.record.user}</td>
    <td>{props.record.sessionType}</td>
    <td>{props.record.entry}</td>
    <td>
      {/* On click - pass the id of the entry up to our index page so we can display teh correct edit dialog */}
      <button className="btn btn-link">Edit</button>|
      <button
        className="btn btn-link"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:3081/api/entries`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return;
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id: any) {
    await fetch(`http://localhost:3081/api/entry/${id}`, {
      method: "DELETE",
    });

    const newRecords = records.filter((el: any) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record: any) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3>Record List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>User</th>
            <th>SessionType</th>
            <th>Entry</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}
