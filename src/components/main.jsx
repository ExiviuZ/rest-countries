import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Main() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  async function getCountries() {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    setCountries(data);
    setLoading(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  const filteredCountries = countries.filter((country) => {
    if (
      filter &&
      !country.region.toLowerCase().startsWith(filter.toLowerCase())
    ) {
      return false;
    }
    if (
      search &&
      !country.name.common.toLowerCase().startsWith(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <main>
      <form className="form" onSubmit={(e) => handleSubmit(e)} action="">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search for a country..."
        />
        <select
          onChange={(e) => setFilter(e.target.value)}
          name="filter"
          id="filter"
        >
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </form>
      <div className="countries-list">
        {loading ? (
          <span>Loading contents...</span>
        ) : filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <Country key={country.name.official} country={country} />
          ))
        ) : (
          <span>No matching countries found.</span>
        )}
      </div>
    </main>
  );
}

function Country({ country }) {
  return (
    <div className="country">
      <div className="flag-container">
        <Link to={`/country/${country.name.common}`}>
          <img
            className="country-flag"
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
          />
        </Link>
      </div>
      <div className="country-overview">
        <Link to={`/country/${country.name.common}`} className="country-name">
          <span className="country-name">{country.name.common}</span>
        </Link>
        <ul>
          <li>
            <b>Population:</b> {country.population.toLocaleString()}
          </li>
          <li>
            <b>Region:</b> {country.region}
          </li>
          <li>
            <b>Capital:</b> {country.capital}
          </li>
        </ul>
      </div>
    </div>
  );
}
