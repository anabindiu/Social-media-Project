import React, { useState, useEffect } from "react";

const API_SETTINGS = "http://localhost:3001/settings/Profile_ID/1";

export const Get_Settings = (props) => {
  const [data, setData] = useState();

  useEffect(() => {
    async function getData() {
      const request = fetch(API_SETTINGS);
      const response = await request;
      const parsed = await response.json();
      setData(parsed);
    }
    getData();
  }, []);

  if (data === undefined) {
    return null;
  }

  console.log(data);
  return <>data</>;
};
