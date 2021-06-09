import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import axios from "axios";

export default function FilterBar({ currentUser, setSelection }) {
  const [menuItems, setMenuItems] = useState(null);

  const filters = [
    { label: "Boat Type", datakey: "boat_type" },
    { label: "Service", datakey: "service_name" },
    { label: "Boat Location", datakey: "boat_location" },
    { label: "Job Type", datakey: "job_is_emergency" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      let result = (
        await axios(
          `http://localhost:3001/api/company/proposals?company_id=${currentUser.company_id}`
        )
      ).data;

      let distinct_values = {};
      filters.forEach((filter) => {
        distinct_values = {
          ...distinct_values,
          [filter.datakey]: [...new Set(result.map((y) => y[filter.datakey]))],
        };
      });
      console.log(distinct_values);
      setMenuItems(distinct_values);
    };

    fetchData();
  }, []);

  return (
    <>
      {menuItems &&
        filters.map((filter, index) => (
          <Filter
            filterLable={filter.label}
            menuItems={menuItems[filter.datakey]}
            setSelection={setSelection}
            datakey={filter.datakey}
            key={index}
          />
        ))}
    </>
  );
}
