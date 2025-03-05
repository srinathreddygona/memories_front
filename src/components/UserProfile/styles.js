import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  profileContainer: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    overflowX: "hidden", 
    boxSizing: "border-box",
  },
  heading: {
    textAlign: "left",
    marginLeft: "10px",
    fontFamily: "sans-serif",
    fontSize: "24px",
    fontWeight: "bold",
  },
  gridContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    maxWidth: "100vw", 
    gap: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  postsWrapper: {
    flex: 1,
    maxWidth: "70%",
    overflow: "hidden", 
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
  },
  postGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: theme.spacing(3),
    width: "100%",
    maxWidth: "100%", 
  },
  formWrapper: {
    width: "25%",
    minWidth: "260px",
    flexShrink: 0,
    maxWidth: "100%", 
    overflow: "hidden", 
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginTop: theme.spacing(3),
    },
  },
  /* ✅ Improved Search Box Styling */
  searchContainer: {
    width: "100%",
    maxWidth: "92%", 
    padding: theme.spacing(2),
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: theme.shadows[6],
    marginBottom: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
    overflow: "hidden", // 
  },
  // formContainer: {
  //   padding: theme.spacing(2),
  //   width: "100%",
  //   borderRadius: "8px",
  //   backgroundColor: "#fff",
  //   boxShadow: "none",
  //   maxWidth: "100%", // 
  // },
  searchButton: {
    marginTop: theme.spacing(1),
    width: "100%",
  },
}));
