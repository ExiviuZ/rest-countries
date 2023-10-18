import React, { useEffect, useState } from "react";
import Header from "../components/header";
import { useParams, Link } from "react-router-dom";

export default function Home() {
  const { countryName } = useParams();
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    async function getCountry() {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${countryName}`
        );
        const data = await response.json();
        setCountryData(data[0]);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    }
    getCountry();
  }, [countryName]);

  return (
    <>
      <BackButton />
      <CountryData country={countryData} />
    </>
  );
}

function BackButton() {
  return (
    <Link to={`/`} className="back-btn">
      &#8592; Back
    </Link>
  );
}

function CountryData({ country }) {
  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <main className="solo-country">
      <div className="img-container">
        <img src={country.flags.png} alt="" />
      </div>
      <div>
        <h1>{country.name.common}</h1>
        <div className="more-data">
          <div>
            <p>
              <b>Population:</b> {country.population.toLocaleString()}
            </p>
            <p>
              <b>Region:</b> {country.region}
            </p>
            <p>
              <b>Sub Region:</b> {country.subregion}
            </p>
            <p>
              <b>Capital:</b> {country.capital[0]}
            </p>
          </div>
          <div>
            <p>
              <b>Top Level Domain:</b> {country.tld[0]}
            </p>
            <p>
              <b>Currencies:</b>{" "}
              {Object.keys(country.currencies).map((key) => (
                <span key={country.currencies[key].name} className="currencies">
                  {country.currencies[key].name}
                </span>
              ))}
            </p>
            <p>
              <b>Languages:</b>{" "}
              {Object.keys(country.languages).map((key) => (
                <span key={country.languages[key]} className="languages">
                  {country.languages[key]}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
