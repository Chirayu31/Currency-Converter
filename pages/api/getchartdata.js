import axios from "axios"

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const query = req.query
        const { base, sym, start_date, end_date } = query

        const headers = {
            'apiKey': process.env.API_KEY
        };

        const requestOptions = {
            method: 'GET',
            url: `https://api.apilayer.com/fixer/timeseries?symbols=${sym}&base=${base}&start_date=${start_date}&end_date=${end_date}`,
            headers: headers
        };

        try {
            const response = await axios(requestOptions);
            return res.status(200).send(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return res.status(400).send("ERROR OCCURRED");
}