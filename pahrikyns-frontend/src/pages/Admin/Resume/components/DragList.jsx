import React, { useState } from "react";
import { Box } from "@mui/material";

export default function DragList({ items, renderItem, onReorder }) {
  const [dragIndex, setDragIndex] = useState(null);

  const handleDragStart = (i) => setDragIndex(i);
  const handleDragEnter = (i) => {
    if (dragIndex === null || dragIndex === i) return;
    onReorder(dragIndex, i);
    setDragIndex(i);
  };

  return (
    <Box>
      {items.map((item, i) => (
        <Box
          key={i}
          draggable
          onDragStart={() => handleDragStart(i)}
          onDragEnter={() => handleDragEnter(i)}
          sx={{
            mb: 1,
            cursor: "grab",
            "&:active": { cursor: "grabbing" },
          }}
        >
          {renderItem(item, i)}
        </Box>
      ))}
    </Box>
  );
}
