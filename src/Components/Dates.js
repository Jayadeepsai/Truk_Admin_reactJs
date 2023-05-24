import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function Dates(props) {


  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [filteredData,setFilteredData] = useState([])


  // useEffect(() => {
  //   getActiveLoads();
  // }, [])

  // const getActiveLoads = async () => {
  //   const activeLoads = await axios.get("http://localhost:3001/quotes/loadsByStatus/Active")
  //   try {
  //     if (activeLoads.data.TotalLoads !== 0) {
  //       setActiveLoads(activeLoads.data.load)
  //       console.log(activeLoads.data.load)
  //     } else {
  //       setTotalLoadsLength(true)
  //       console.log("No loads are posted.")
  //     }

  //   } catch (err) {
  //     console.log(err)
  //   }

  // }

  // const initialDate = '2023-08-12T12:00'
  // const datee = (initialDate.split('T')[0])

  // const lastDate = '2023-05-10T10:40'
  // const datess = (lastDate.split('T')[0])



  // Define the start and end dates for filtering
  const StartDate = new Date(startDate);
  const EndDate = new Date(endDate);

  // Filter the data between the start and end dates

  const handleFilter = () => {
    const filteredData = props.filteringData.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= StartDate && itemDate <= EndDate;
    });
    setFilteredData(filteredData)

  }


  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateTimePicker']}>
          <DateTimePicker label="Start Date" value={startDate} onChange={(startDate) => setStartDate(startDate)} />
        </DemoContainer>

        <DemoContainer components={['DateTimePicker']}>
          <DateTimePicker label="End Date" value={endDate} onChange={(endDate) => setEndDate(endDate)} />
        </DemoContainer>
      </LocalizationProvider>

      {/* Render the filtered data */}
      <Button onClick={handleFilter}>Filter</Button>
      {filteredData.map(item => (
        <div >
          <p>{item.OriginLocation}</p>
          <br />
          <p>{item.Number}</p>

          <p>{item.date}</p>
        </div>
      ))}-
    </div>
  );
};

