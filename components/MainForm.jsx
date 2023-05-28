import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import SelectCountry from './Elements/SelectCountry';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Graph from './Graph';

const defaultValues = {
    value1: 0,
    value2: 0,
    currency1: 'INR',
    currency2: 'USD',
    exchangeRate: 82.57
};

const getExchangeRate = async (base, sym) => {
    try {
        const { data } = await axios.get(`/api/getexchangerate?sym=${sym}&base=${base}`)

        return data
    } catch (error) {
        console.log(error)
        return 0
    }

}

export default function MainForm({ currencyData }) {
    const [formState, setFormState] = useState(defaultValues);
    const symbols = Object.keys(currencyData)

    useEffect(() => {
        const fetchExchangeRate = async () => {
            const exchangeRate = await getExchangeRate(
                formState.currency1,
                formState.currency2
            );

            setFormState(prevState => ({
                ...prevState,
                exchangeRate,
                value2: (prevState.value1 * exchangeRate).toFixed(4)
            }));
        };

        fetchExchangeRate();
    }, [formState.currency1, formState.currency2]);


    const handleValueChange = (field, value) => {
        let sanitizedValue = value;

        if (field === 'value1' || field === 'value2') {
            sanitizedValue = sanitizedValue.replace(/[-+e]/gi, '');

            if (!isNaN(sanitizedValue)) {

                const convertedValue = field === 'value1'
                    ? sanitizedValue * formState.exchangeRate
                    : sanitizedValue / formState.exchangeRate;

                setFormState(prevState => ({
                    ...prevState,
                    [field]: sanitizedValue,
                    [field === 'value1' ? 'value2' : 'value1']: convertedValue.toFixed(4)
                }));
            }
        } else {
            setFormState(prevState => ({
                ...prevState,
                [field]: sanitizedValue,
            }));
        }
    };

    return (
        <>
            <Container maxWidth="sm"
                style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
            >
                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }} m={3}>
                    {formState.exchangeRate} (Guaranteed Rate)
                </Typography>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <Stack spacing={2} direction="row" divider={<Divider orientation="vertical" flexItem />}>

                        <TextField
                            type="text"
                            label={`Enter Amount in ${formState.currency1}`}
                            value={formState.value1}
                            variant="outlined"
                            color="primary"
                            onChange={e => handleValueChange('value1', e.target.value)}
                        />
                        <SelectCountry
                            symbols={symbols.filter(symbol => symbol !== formState.currency2)}
                            currencyData={currencyData}
                            value={formState.currency1}
                            onCurrencyChange={(value) => handleValueChange('currency1', value)}
                        />
                    </Stack>

                    <Stack spacing={2} direction="row" divider={<Divider orientation="vertical" flexItem />}>
                        <TextField
                            type="text"
                            label={`Enter Amount in ${formState.currency2}`}
                            value={formState.value2}
                            variant="outlined"
                            color="primary"
                            onChange={e => handleValueChange('value2', e.target.value)}
                        />
                        <SelectCountry
                            symbols={symbols.filter(symbol => symbol !== formState.currency1)}
                            currencyData={currencyData}
                            value={formState.currency2}

                            onCurrencyChange={(value) => handleValueChange('currency2', value)}
                        />
                    </Stack>
                </form>
            </Container>

            <Graph currency1={formState.currency1} currency2={formState.currency2} />
        </>
    );
};


