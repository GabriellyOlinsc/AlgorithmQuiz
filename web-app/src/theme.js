import { createTheme } from '@mui/material/styles';

// Definindo o tema com primary e secondary personalizados
const theme = createTheme({
  palette: {
    primary: {
      main: '#29B8ACD4', // Cor principal (cinza escuro)
    },
    secondary: {
      main: '#FFA07A', // Cor secundária (laranja, por exemplo)
    },
    info: {
        main: '#C2BCBC', // Cor info (azul claro, por exemplo)
      },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Font padrão
  },
});

export default theme;
