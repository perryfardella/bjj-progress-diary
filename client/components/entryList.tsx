import { Button, Dialog } from "@mui/material";
import React, { useEffect } from "react";
import { Entry } from "../types";
import EditEntry from "./editEntry";

interface entryListProps {
  selectedDate: Date | null;
}

const EntryList: React.FC<entryListProps> = ({ selectedDate }) => {
  const [entries, setEntries] = React.useState<Entry[]>([]);
  const [selectedEntry, setSelectedEntry] = React.useState<Entry>();

  // Hook to keep track of the edit dialog status
  const [editDialogIsOpen, setEditDialogIsOpen] =
    React.useState<boolean>(false);

  const Entry = (props: any) => (
    <tr>
      <td>{props.entry.user}</td>
      <td>{props.entry.sessionType}</td>
      <td>{props.entry.entry}</td>
      <td>
        {/* On click - pass the id of the entry up to our index page so we can display teh correct edit dialog */}
        <Button variant="outlined" onClick={() => handleEditClick(props.entry)}>
          Edit
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            props.deleteEntry(props.entry._id);
          }}
        >
          Delete
        </Button>
      </td>
    </tr>
  );

  const handleEditClick = (selectedEntry: Entry) => {
    setSelectedEntry(selectedEntry);
    setEditDialogIsOpen(true);
  };

  // This method fetches the entries from the database.
  useEffect(() => {
    async function getEntries() {
      const response = await fetch(`http://localhost:3081/api/entries`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const entries = await response.json();
      setEntries(entries);
    }

    getEntries();

    return;
  }, [entries.length]);

  // This method will delete a entry
  async function deleteEntry(id: string) {
    await fetch(`http://localhost:3081/api/entry/${id}`, {
      method: "DELETE",
    });

    const newEntries = entries.filter((el: Entry) => el._id !== id);
    setEntries(newEntries);
  }

  // This method will map out the entries on the table
  const entryList = () => {
    return entries.map((entry: Entry) => {
      // Convert ISO Date string to a Date object
      const entryDate = new Date(entry.entryDate);
      if (
        entryDate.getDate() === selectedDate?.getDate() &&
        entryDate.getMonth() === selectedDate?.getMonth() &&
        entryDate.getFullYear() === selectedDate?.getFullYear()
      ) {
        return (
          <Entry
            entry={entry}
            deleteEntry={() => deleteEntry(entry._id)}
            key={entry._id}
          />
        );
      }
    });
  };

  // This following section will display the table with the entries of individuals.
  return (
    <>
      <div>
        <h3>Entry List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>User</th>
              <th>SessionType</th>
              <th>Entry</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{entryList()}</tbody>
        </table>
      </div>

      {selectedEntry && (
        <Dialog
          onClose={() => setEditDialogIsOpen(false)}
          open={editDialogIsOpen}
        >
          {/* On submission need to close the dialog, can pass setDialogIsOpen(false) down as a function prop that's called on submission */}
          <EditEntry entryId={selectedEntry!._id} />
        </Dialog>
      )}
    </>
  );
};

export default EntryList;
