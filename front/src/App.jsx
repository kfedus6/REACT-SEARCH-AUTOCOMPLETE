import { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';

function App() {
    const [countries, setCountries] = useState([])
    const [value, setValue] = useState('')
    const [isOpen, setIsOpen] = useState(true)

    const fetchCountries = async () => {
        const response = await axios.get('https://restcountries.com/v3.1/all')
        setCountries(response.data)
    }

    useEffect(() => {
        fetchCountries()
    }, [])

    const filteredCountries = countries.filter(country => {
        return country.name.common.toLowerCase().includes(value.toLowerCase())
    })

    const itemClickHandler = (e) => {
        setValue(e.target.textContent)
        setIsOpen(!isOpen)
    }

    const inputClickHandler = () => {
        setIsOpen(true)
    }

    return (
        <div>
            <header className='header'>
                <div>
                    <h3>Where is the world?</h3>
                </div>
            </header>
            <main className='conteiner'>
                <div className='content'>
                    <div className='search'>
                        <input
                            type="text"
                            placeholder='Search in the country...'
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onClick={inputClickHandler}
                        />
                        <ul className="autocomlete">
                            {value && isOpen
                                ?
                                filteredCountries.map((item, idx) => (
                                    <li key={item.population} onClick={itemClickHandler} className='autocomplete-item'>{item.name.common}</li>
                                ))
                                :
                                null
                            }
                        </ul>
                    </div>
                    <div className='block-items'>
                        {filteredCountries.map((item, idx) => (
                            <div className='block-item' key={idx}>
                                <img src={item.flags.png} alt={item.name.common} />
                                <div>
                                    <span><strong>{item.name.common}</strong></span>
                                    <span>Population: {item.population}</span>
                                    <span>Region: {item.region}</span>
                                    <span>Capital: {item.capital}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
