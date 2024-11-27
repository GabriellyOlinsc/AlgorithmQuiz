export const classes = {
    container: {
      height: "100vh",
      background: "linear-gradient(to right, #B6FFEA, #29B8ACD4)",
      alignItems: "center",
      justifyContent: "center",
    },
    card: {
      display: "flex",
      boxShadow: 3,
      borderRadius: 2,
      overflow: "hidden",
      backgroundColor: "white",
    },
    leftBox: {
      flex: 1,
      backgroundColor: "#FFA07A",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 4,
      color: "white",
    },
    rightBox: {
      flex: 1,
      padding: 4,
    },
    logoImage: {
      width: "100%",
      height: "100%",
      marginBottom: 16,
    },
    loginTitle: {
      textAlign: "center",
      marginBottom: 16,
    },
    loginButton: {
      backgroundColor: "#FFA07A",
      "&:hover": { backgroundColor: "#ff7f50" },
    },
  };
  