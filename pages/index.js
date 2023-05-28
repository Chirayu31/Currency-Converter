import Head from 'next/head'
import { ThemeProvider, Typography, createTheme } from '@mui/material';
import MainForm from '@/components/MainForm';
import data from '@/data';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e5ef3',
    },
    secondary: {
      main: '#e57373',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
  },
})


export default function Home() {

  return (
    <>
      <Head>
        <title>Currency Converter</title>
        <meta name="description" content="Currency Converter app in NextJS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider theme={theme}>

        <Typography sx={{ fontWeight: 'bold' }} variant="h5" m={3}>
          Currency Converter
        </Typography>

        <MainForm currencyData={data} />

      </ThemeProvider>
    </>
  )
}
