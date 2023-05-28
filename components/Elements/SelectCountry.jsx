import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

const SelectCountry = ({ symbols, currencyData, value, onCurrencyChange }) => {

    const handleCurrencyChange = (e) => {
        onCurrencyChange(e.target.value);
    };

    return (
        <FormControl sx={{ width: { xs: 100, sm: 100, md: 150 } }}>
            <InputLabel id="demo-simple-select-label">Currency</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Currency"
                value={value}
                onChange={handleCurrencyChange}
                MenuProps={{
                    style: {
                        maxHeight: 400,
                    },
                }}
            >

                {symbols?.map((currency, idx) => (
                    <MenuItem
                        key={idx}
                        value={currency}
                    >
                        {`${currency} - ${currencyData[currency]}`}
                    </MenuItem>
                ))}

            </Select>
        </FormControl>
    )
}

export default SelectCountry