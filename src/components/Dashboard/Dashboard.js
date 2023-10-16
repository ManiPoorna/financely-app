import React, { useEffect, useState } from "react";
import "./style.css";
import { toast } from "react-toastify";
import { db, auth } from "../../firebase.js";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import Cards from "../Cards/Cards.js";
import IncomeModal from "../Modals/IncomeModals.js";
import ExpenseModal from "../Modals/ExpenseModal.js";
import Loader from "../Loader/Loader.js";
import TransactionTable from "../TransactionTable/TransactionTable.js";
import LineChart from "../Charts/LineChart";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  // console.log("User-> ", user)
  const [loading, setloading] = useState(false);
  const [isIncomeModalOpen, setIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setExpenseModalOpen] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpenses] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  // console.log(searchTerm, selectedValue)

  useEffect(() => {
    getAllTransactions();
  }, [user]);

  // Functions to handle modal visibility
  function closeIncomeModal() {
    setIncomeModalOpen(false);
  }
  function closeExpenseModal() {
    setExpenseModalOpen(false);
  }

  // Getting data from Modal and adding to firebase cloud
  function onSubmit(values, type) {
    // console.log("Values and Type: ", values, type)
    let transaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      name: values.name,
      amount: +values.amount,
      tag: values.tag,
    };
    addTransaction(transaction);
  }

  // addTransaction function is to add transacctions to Firestore collections
  async function addTransaction(data, many) {
    try {
      const docRef = await addDoc(
        collection(db, `Users/${user.uid}/transactions`),
        data
      );
      if (!many) toast.success("Transaction Added");
      let newTransaction = transactions;
      newTransaction.push(data);
      setTransactions(newTransaction);
      fetchBalance(newTransaction);
      // console.log("DocREF : ", docRef)
    } catch (error) {
      if (!many) toast.error("Couldnot add Transaction");
    }
  }

  // getAllCollections function is to fetch all transacctions from Firestore collections
  async function getAllTransactions() {
    setloading(true);
    if (user) {
      try {
        const q = query(collection(db, `Users/${user.uid}/transactions`));
        const querySnapshot = await getDocs(q);
        let totalTransactions = [];
        querySnapshot.forEach((transaction) => {
          totalTransactions.push(transaction.data());
        });
        // console.log("Total Transactions", totalTransactions)

        // Fetching all balances
        fetchBalance(totalTransactions);

        // Setting total transaction
        setTransactions(totalTransactions);

        // Displaying Success message
        // toast.success("Transactions Fetched successfully")
      } catch (error) {
        toast.error(error.message);
      }
    }
    setTimeout(() => {
      setloading(false);
    }, 1500);
  }

  function fetchBalance(transactions) {
    let income = 0;
    let expenses = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === "Income") {
        income += transaction.amount;
      } else {
        expenses += transaction.amount;
      }
    });
    setTotalIncome(income);
    setTotalExpenses(expenses);
    setTotalBalance(income - expenses);
  }

  // Sorted Transacions Date wise for line chart
  let sortedTransaction = transactions.sort((a, b) => {
    return new Date(a.date) - new Date(b.date)
  })
  // console.log(sortedTransaction)

  return (
    <div className="dashboard">
      {loading ? (
        <Loader />
      ) : (
          <>
          <Cards
            totalIncome={totalIncome}
            totalExpense={totalExpense}
            totalBalance={totalBalance}
            setIncomeModalOpen={setIncomeModalOpen}
            setExpenseModalOpen={setExpenseModalOpen}
          />
          {/* Income modal component */}
          <IncomeModal
            isIncomeModalOpen={isIncomeModalOpen}
            closeIncomeModal={closeIncomeModal}
            onSubmit={onSubmit}
          />

          {/* Expense modal component */}
          <ExpenseModal
            isExpenseModalOpen={isExpenseModalOpen}
            closeExpenseModal={closeExpenseModal}
            onSubmit={onSubmit}
          />

          {/* Transaction analytics component */}
          {
            transactions && transactions.length !== 0 ?
              < LineChart sortedTransaction={sortedTransaction} />
              : <h1 style={{textAlign:"center", padding:"3rem"}}>No Transactions Yet</h1>
          }

          {/* Transaction table component */}
          <TransactionTable
            transactions={transactions}
            addTransaction={addTransaction}
            fetchBalance={fetchBalance}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
