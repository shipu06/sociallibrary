import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "utils/theme";

import Flats from "./Flats";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Flats />
    </ThemeProvider>
  );
}

export default App;
