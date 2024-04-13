import React from "react";
import BasicCard from "../cards/card";
import { useEffect } from "react";
import axios from 'axios';
import Button from "@mui/material/Button";


const Container = () => {
  const [refetch, setRefetch] = React.useState(false);
  const [notesList, setNotesList] = React.useState([]);
  const [description, setDescription] = React.useState("");
  const [title, setTitle] = React.useState("");

  const handleSubmit = async () => {
    console.log("title", title);
    console.log("description", description);
  
    const payload = {
      title: title,
      description: description,
      date: new Date().toISOString() // Adding the current date as ISO string
    };
  
    try {
      const response = await axios.post("http://localhost:3001/api/notes", payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log("Data submitted successfully");
      setRefetch(!refetch)
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/notes/getAll");
        if (response.status === 200) {
          setNotesList(response.data); 
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching cards:", error);
        // Handle the error, e.g., display an error message to the user
      }
    };
  
    fetchCards();
  }, [refetch]);
  
  return (
    <>
      <div className="flex flex-col gap-3 bg-[#688880] pt-3 h-[85%] ">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Write Title..."
            className="bg-custom-white p-2 rounded-md"
            style={{ height: "35px", width: "40%" }}
          />
        </div>
        <div>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Take a note..."
            className="bg-custom-white p-2 rounded-md"
            style={{ height: "65px", width: "40%" }}
          />
        </div>
        <Button variant="contained" sx={{color:"white", width:"160px", alignSelf:"center"}}
        onClick={handleSubmit}
        disabled={title.length<=0 ||description.length<=0?true:false}>Add Note</Button>

        <div className="p-3 flex flex-row gap-3">
          {notesList?.map((item) => {
            return <BasicCard item={item} refetch={refetch} setRefetch={setRefetch}/>;
          })}
        </div>
      </div>
    </>
  );
};

export default Container;
