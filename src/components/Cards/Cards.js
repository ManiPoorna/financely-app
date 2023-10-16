import React from 'react';
import "./style.css";
import { Card, Row } from 'antd';
import Button from "../Button/Button.js"

const Cards = ({ setIncomeModalOpen, setExpenseModalOpen,
	totalIncome, totalExpense, totalBalance }) => {
	return (
		<div className='card'>
			<Row className='cards-row'>
				<Card className='child-card' bordered={true} >
					<h2>Total Balance</h2>
					<h3 style={{ color: "green" }}>₹{totalBalance.toFixed(2)}</h3>
					<Button tyeOfLogin={true} text="Reset" />
				</Card>
				<Card className='child-card' bordered={true} >
					<h2>Total Income</h2>
					<h3>₹{totalIncome.toFixed(2)}</h3>
					<Button onClick={(e) => setIncomeModalOpen(true)} tyeOfLogin={true} text="Add Income" />
				</Card>
				<Card className='child-card' bordered={true} >
					<h2>Total Expenses</h2>
					<h3 style={{ color:"#ff0000b3"}}>₹{totalExpense.toFixed(2)}</h3>
					<Button onClick={(e) => setExpenseModalOpen(true)} tyeOfLogin={true} text="Add Expense" />
				</Card>
			</Row>
		</div>
	)
}

export default Cards