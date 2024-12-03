export const classes = {
    container: {
      display: "flex",
      height: "100vh",
      background: "linear-gradient(to right, #B6FFEA, #29B8ACD4)",
    },
    sidebar: {
      width: "20%",
      backgroundColor: "#ffab91",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginLeft: 4,
      marginY: 3,
      borderRadius: "15px",
      boxShadow: "3px 0 10px rgba(0,0,0,0.2)",
      padding: 2,
      height: "60%"
    },
    sidebarHeader: {
      width: "100%",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      marginBottom: "1.5rem", // Espaçamento inferior
    },
    sidebarButton: {
      backgroundColor: "#FFF",
      color: "black",
      width: "100%",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
      ":hover": {
        backgroundColor: "#ffc1a8",
      },
    },
    avatar: {
      width: "140px",
      height: "140px",
      marginBottom: "1rem",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    },
    mainArea: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 2,
      marginY: 1,
    },
    paper: {
      width: "90%",
      height: "100%",
      padding: 2,
      backgroundColor: "#f5f5f5",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    typography: {
      textAlign: "center",
    },
  };
  