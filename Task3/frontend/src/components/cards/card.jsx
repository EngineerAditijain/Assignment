import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import axios from 'axios';

export default function BasicCard({ item ,refetch,setRefetch}) {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/notes/${item.id}`);
      if (response.status === 200) {
        console.log("Note deleted successfully");
        setRefetch(!refetch)
        // Optionally, update your UI state after successful deletion
      } else {
        throw new Error("Failed to delete note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };
  

  return (
    <Card
      sx={{
        width: "25%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#E0D8C8",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          background: "#EOD8C8",
        }}
      >
        <Typography variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {item.description}
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2">{item.date}</Typography>
          <Button size="small" onClick={handleDelete}>{<DeleteIcon />}</Button>
        </div>
      </CardContent>
    </Card>
  );
}
