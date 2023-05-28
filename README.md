# Currency Converter App

This is a currency converter app built with Next.js, Material-UI, and the Fixer API. It allows users to convert between different currencies based on the latest exchange rates and view historical data in the form of a graph.

## Features

- Convert currencies: Enter an amount in one currency and instantly see the converted amount in another currency.
- Real-time exchange rates: The app fetches the latest exchange rates from the Fixer API, ensuring accurate and up-to-date conversions.
- User-friendly interface: The app provides a clean and intuitive user interface for a seamless conversion experience.
- Material-UI components: The app utilizes Material-UI's components and styles for a modern and visually appealing design.
- Historical data graph: View the last one year's historical exchange rates for selected currency pairs using Chart.js.

## Technologies Used

- Next.js: A React framework for building server-side rendered and statically generated applications.
- Material-UI: A popular UI component library for React that provides pre-styled components and themes.
- Fixer API: A free foreign exchange rates API that provides up-to-date currency exchange rates.
- Chart.js: A JavaScript library for creating interactive and customizable charts.

## Getting Started

To get started with the currency converter app, follow these steps:

1. Clone the repository: `git clone [repository URL]`
2. Navigate to the project directory: `cd currency-converter-app`
3. Install the dependencies: `npm install`
4. Set up the Fixer API key:
   - Sign up for a free Fixer API key at [Fixer](https://fixer.io).
   - Copy the API key.
   - Create a `.env.local` file in the project root.
   - Add the following line to the `.env.local` file: `API_KEY=[Your API key]`
   - Replace `[Your API key]` with your actual Fixer API key.
5. Start the development server: `npm run dev`
6. Open your browser and navigate to `http://localhost:3000` to access the app.

## Acknowledgements

- [Next.js](https://nextjs.org)
- [Material-UI](https://mui.com)
- [Fixer](https://fixer.io)
- [Chart.js](https://www.chartjs.org)
