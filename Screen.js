import { useEffect, useState } from "react";
import "./Screen.css";

import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";
import client from "./client";

const GET_COUNTRIES = gql`
  {
    countries {
      name
      code
    }
  }
`;

const GET_COUNTRY_DETAILS = gql`
  query Country($countryCode: ID!) {
    country(code: $countryCode) {
      name
      native
      emoji
      currency
      code
      phone
      languages {
        code
        name
      }
    }
  }
`;

const Screen = () => {
  const [country, setCountry] = useState("IN");

  const [detail, setDetail] = useState();

  const { data, loading, error } = useQuery(GET_COUNTRIES);

  useEffect(() => {
    getDetails("IN");
  }, []);

  const getDetails = async (country) => {
    const { data } = await client.query({
      query: GET_COUNTRY_DETAILS,
      variables: { countryCode: country },
    });
    setDetail(data.country);
  };
  return (
    <>
      {(data!==undefined && detail!==undefined ) ? (
        <section className="main">
         <div>

            <div className="card">
              <div className="sec-center"> 	
              <input className="dropdown myDropDown" type="checkbox"  id="dropdown" name="dropdown"/>
              
              <label className="for-dropdown myDropDown" for="dropdown" >Select Country <i className="uil uil-arrow-down"></i></label>
              
              <div className="section-dropdown myDropDown"> 

              {data.countries.map((country, i) => {
                      return (
                        <a key={i} value={country.code} onClick={(e) => {
                          setCountry(country.code);
                          getDetails(country.code);
                        }}>{country.name} </a>

                      );
              })}
                        
          </div>
        </div>



            </div>



            <div className="card card-1">
              <h1>Country Details : {detail.code}</h1>
              <p className="title button">
                <span className="sub-title">Name </span>
                <span className="sub-title2"> {detail.name} </span>
              </p>
              <p className="title button">
                <span className="sub-title">Phone Code </span>
                <span className="sub-title2">{detail.phone}</span>
              </p>
              <p className="title button">
                <span className="sub-title">Currency</span>
                <span className="sub-title2">{detail.currency}</span>
              </p>
              <p className="title button">
                <span className="sub-title">Native</span>
                <span className="sub-title2">{detail.native}</span>
              </p>
            </div>
          </div>
        </section>
      ) : (
        <>Loading</>
      )}
    </>
  );
};

export default Screen;