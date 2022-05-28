import React, { useEffect, useState } from 'react'
import {AutoSizer, Column, Table } from 'react-virtualized';
import Fuse from 'fuse.js'
import 'react-virtualized/styles.css';

function MyTable({onError}) {
  const [hourlyPoi, setHourlyPoi] = useState([])
  const [matchingTerms, setMatchingTerms] = useState([])

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + '/stats/hourlypoi')
      .then(res => res.json())
      .then(
        (result) => {
          setHourlyPoi(result)
          if (result.error) onError(result.error)
        }
      )
  }, [onError])

  function highlightCellRenderer({cellData, rowData}){
    return <div style={{fontWeight: matchingTerms.some(term=> term === rowData.name)? "bold" : "normal", marginRight: "10px", overflow: "hidden"}}>{cellData}</div>;
  }

  const searchItem = (query) => {
    const fuse = new Fuse(hourlyPoi, {
      shouldSort: true,
      threshold: 0.1,
      location: 0,
      distance: 100,
      keys: ["name"]
    });
    const result = fuse.search(query);
    const finalResult = [];
    if (result.length) {
      result.forEach((item) => {
        finalResult.push(item.item.name);
      });
      setMatchingTerms(finalResult);
    } else {
      setMatchingTerms([]);
    }
  };

  return hourlyPoi.length ? (
    <div style={{height: "calc(100% - 30px)", width: "100%"}}>
      <input
        type="search"
        onChange={(e) => searchItem(e.target.value)}
        placeholder="Search"
      /> 
      <AutoSizer>
        {({height, width}) => (
          <Table
            height={height}
            width={width}
            headerHeight={30}
            rowCount={hourlyPoi.length}
            rowHeight={20}
            rowGetter={({index}) => hourlyPoi[index]}
          >
            <Column
              label="Date"
              dataKey="date"
              width={300}
              cellRenderer={highlightCellRenderer}
            />
            <Column
              label="Name"
              dataKey="name"
              width={300}
              cellRenderer={highlightCellRenderer}
            />
            <Column
              label="Impressions"
              dataKey="impressions"
              width={300}
              style={{textAlign: "right"}}
              headerStyle={{textAlign: "right"}}
              cellRenderer={highlightCellRenderer}
            />
            <Column
              label="Clicks"
              dataKey="clicks"
              width={300}
              style={{textAlign: "right"}}
              headerStyle={{textAlign: "right"}}
              cellRenderer={highlightCellRenderer}
            />
            <Column
              label="Revenue"
              dataKey="revenue"
              width={300}
              style={{textAlign: "right"}}
              headerStyle={{textAlign: "right"}}
              cellDataGetter={({rowData, dataKey}) => '$' + parseFloat(rowData[dataKey]).toFixed(2)}
              cellRenderer={highlightCellRenderer}
            />
          </Table>
        )}
      </AutoSizer>
    </div>
  ) : (
    <></>
  )
}

export default MyTable
