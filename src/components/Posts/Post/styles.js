import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    height: "380px", // Fixed height for uniformity
    position: "relative",
    overflow: "hidden",
  },
  media: {
    height: "180px",
    objectFit: "cover",
    position: "relative",
    filter: "brightness(0.7)", // Dims the image
    backgroundBlendMode: "darken", // Ensures better contrast with dark overlay
  },
  
  overlay: {
    position: "absolute",
    top: "10px",
    left: "10px",
    color: "white",
    fontWeight: "bold",
    padding: "5px 10px",
    borderRadius: "5px",
   // Dark overlay for text visibility
  },
  overlay2: {
    position: "absolute",
    top: "10px",
    right: "10px",
    color: "white",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    margin: "5px 10px",
  },
  title: {
    padding: "0 16px",
    textAlign: "left",
    fontWeight: "initial",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  tagContainer: {
    whiteSpace: "nowrap", // Prevents wrapping to a new line
    overflow: "hidden",   // Hides overflow text
    textOverflow: "ellipsis", // Adds "..." if text overflows
    display: "block", // Ensures it behaves as a block for correct styling
    maxWidth: "100%", // Prevents text from overflowing the card width
  },
  
  cardContent: {
    flexGrow: 1, // Ensures content fills available space
    padding: "10px",
  },
  description: {
    display: "-webkit-box",
    "-webkit-line-clamp": 3, // Limits text to 3 lines
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  cardActions: {
    padding: "10px 16px",
    display: "flex",
    justifyContent: "space-between",
  },
  cardAction: {
    display: "block",
    textAlign: "initial",
    width: "100%",
  },
}));
