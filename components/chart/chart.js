import React, { useEffect, useState } from 'react'
import { ResponsiveBar } from '@nivo/bar'

function Chart({ onError }) {
  const [dailyStats, setDailyStats] = useState([])

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + '/events/week')
      .then((res) => res.json())
      .then((result) => {
        setDailyStats(result)
        if (result.error) onError(result.error)
      })
  }, [onError])

  return dailyStats.length ? (
    <ResponsiveBar
      data={dailyStats}
      keys={['EQ Works', 'CN Tower', 'Vancouver Harbour', 'Niagara Falls']}
      indexBy='date'
      groupMode='grouped'
      margin={{ top: 50, right: 60, bottom: 200, left: 60 }}
      padding={0.3}
      axisBottom={{
        tickSize: 5,
        tickPadding: 50,
        tickRotation: -40,
        legend: 'date',
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'events',
        legendPosition: 'middle',
        legendOffset: -40,
      }}
    />
  ) : (
    <></>
  )
}

export default Chart
