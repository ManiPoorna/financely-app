import React, { useEffect, useState } from 'react'
import { Line, Pie } from '@ant-design/charts';
import "./style.css"

const LineChart = ({ sortedTransaction }) => {

  // filtering Line chart Data
  const chartData = sortedTransaction.map((transaction) => {
    return {
      date: transaction.date,
      amount: transaction.amount,
    }
  });


  // filtering Pie chart Data
  let finalSpendings = sortedTransaction.reduce((acc, transaction) => {
    let key = transaction.tag;
    if (!acc[key]) {
      acc[key] = {
        tag: transaction.tag,
        amount: transaction.amount
      }
    }
    else {
      acc[key].amount += transaction.amount;
    }
    return acc
  }, {});


  let chart;
  const config = {
    data: chartData,
    width: (window.innerWidth > 510 ? 500 : 240),
    height: (window.innerWidth > 510 ? 300 : 150),
    autoFit: false,
    xField: 'date',
    yField: 'amount',
    point: {
      size: 3,
      shape: 'square',
    },
  };

  let pieChart;
  const spendingConfig = {
    data: Object.values(finalSpendings),
    width: (window.innerWidth > 510 ? 400 : 150),
    height: (window.innerWidth > 510 ? 300 : 150),
    angleField: "amount",
    colorField: "tag",
  };

  return (
    <div  className='charts-wrapper'>
      <div className='charts'>
        <div className='line-chart'>
          <h2>Your Transaction Analytics</h2>
          <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
        </div>
        <div className='pie-chart'>
          <h2>Your Income & Expenses</h2>
          <Pie {...spendingConfig} onReady={(chartInstance) => (pieChart = chartInstance)} />
        </div>
      </div>
    </div>
  )
}

export default LineChart