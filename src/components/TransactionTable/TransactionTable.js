import React, { useState } from 'react'
import "./style.css"
import { Input, Table, Radio, Select } from 'antd';
import { parse, unparse } from 'papaparse';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from "../../firebase.js"
import { toast } from 'react-toastify';

const TransactionTable = ({ transactions, addTransaction, fetchBalance }) => {

	// console.log(transactions)

	const [user] = useAuthState(auth)
	const { Option } = Select
	const [searchTerm, setSearchTerm] = useState("")
	const [dropdown, setDropDown] = useState([]);
	const [radiovalue, setRadioValue] = useState("");
	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Amount',
			dataIndex: 'amount',
			key: 'amount',
		},
		{
			title: 'Tag',
			dataIndex: 'tag',
			key: 'tag',
		},
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
		},
		{
			title: 'Date',
			dataIndex: 'date',
			key: 'date',
		},
	];

	// Filtering Trnsactions by input ad dropdown
	let filteredTransactions = transactions.filter((item) => {
		return item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
			item.type.includes(dropdown)
	})

	// Sorting by date & Amount
	let sortedTransactions = filteredTransactions.sort((a, b) => {
		if (radiovalue === "date") {
			return new Date(a.date) - new Date(b.date);
		}
		else if (radiovalue === "amount") {
			return b.amount - a.amount;
		}
		else {
			return 0;
		}
	})

	// this function is to export csv file contains all transactions
	function exportCsv() {
		var csv = unparse({
			"fields": ["name", "type", "tag", "date", "amount"],
			data: transactions
		});
		var data = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
		var csvURL = window.URL.createObjectURL(data);
		let tempLink = document.createElement('a');
		tempLink.href = csvURL;
		tempLink.setAttribute('download', user ? `${user.displayName}-transactions.csv` : "Transactions.csv");
		tempLink.click();
	}

	// this function is to import csv file from folders
	function importCsv(event) {
		event.preventDefault();
		try {
			parse(event.target.files[0],{
				header: true,
				complete: async function (results) {
					console.log(results)
					for (const transaction of results.data) {
						const newTransaction = { ...transaction, amount: parseFloat(transaction.amount) }
						await addTransaction(newTransaction,true)
					}
				}
			})
			toast.success("Transaction added!")
			fetchBalance(); 
			event.target.files = null;
		}
		catch (error) {
			// toast.error(error.message)
			console.log(error.message)
		}
	}

	return (
		<div className='table-wrapper'>
			<div className='search-option'>
				<Input placeholder='Search transaction by name' className='ant-input-1' onChange={(e) => setSearchTerm(e.target.value)} />
				<Select className='select-antd' defaultValue="All" onChange={(value) => setDropDown(value)}>
					<Option value="">All</Option>
					<Option value="Expense">Expenses</Option>
					<Option value="Income">Income</Option>
				</Select>
			</div>
			<div className='radio-btn'>
				<div>
					<h2>All Transactions</h2>
				</div>
				<div className='radio-btns'>
					<Radio.Group onChange={(e) => setRadioValue(e.target.value)} defaultValue="a">
						<Radio.Button value="nosort">No Sort</Radio.Button>
						<Radio.Button value="date">Sort By Date</Radio.Button>
						<Radio.Button value="amount">Sort By Amount</Radio.Button>
					</Radio.Group>
				</div>
				<div className='btns'>
					<div>
						<label className='normal' htmlFor="export-csv" onClick={exportCsv}>Download Statement</label>
					</div>
					<div>
						<label className='normal' htmlFor="import-csv">Import Tranasactions</label>
						<input id='import-csv' type='file' onChange={(e)=>importCsv(e)} />
					</div>
				</div>
			</div>
			<Table dataSource={sortedTransactions} columns={columns} />
		</div>
	)
}

export default TransactionTable