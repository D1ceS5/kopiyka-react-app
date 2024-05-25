import { useEffect, useState } from "react";
import { BASE_URL } from "../constants.jsx";
const useBalance = (userId) => {
  const [balanceList, setBalanceList] = useState([]);
  const [transactionList, setTransactionList] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loadingList, setLoadingList] = useState([]);
  const [isBalanceSet, setIsBalanceSet] = useState(true);
  const [selectedRange, setSelectedRange] = useState("month");
  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    if (!balanceList.length) getBalanceList();
    getTransactionList();
  }, [userId]);

  const getBalanceList = async () => {
    setLoadingList((prev) => [...prev, "balance"]);
    const response = await fetch(BASE_URL + "/balances?userId=" + userId);
    const balances = await response.json();

    if (!balances.balances.length && userId) setIsBalanceSet(false);
    setBalanceList(balances.balances);
    setLoadingList((prev) => {
      return prev.filter((l) => l !== "balance");
    });
  };
  const filter = (range = selectedRange, type = selectedCategory) => {
    let date = new Date();
    let transactionsCopy = transactionList;

    switch (range) {
      case "year": {
        const currentYear = date.getFullYear();
        transactionsCopy = transactionList.filter((t) => {
          const transactionDate = new Date(t.transaction_date);
          return currentYear == transactionDate.getFullYear();
        });

        break;
      }
      case "month": {
        const currentYear = date.getFullYear();
        const currentMonth = date.getMonth();
        transactionsCopy = transactionList.filter((t) => {
          const transactionDate = new Date(t.transaction_date);
          return (
            currentMonth == transactionDate.getMonth() &&
            currentYear == transactionDate.getFullYear()
          );
        });
        break;
      }
      case "day": {
        const currentYear = date.getFullYear();
        const currentMonth = date.getMonth();
        const currentDay = date.getDate();

        transactionsCopy = transactionList.filter((t) => {
          const transactionDate = new Date(t.transaction_date);
          return (
            currentMonth == transactionDate.getMonth() &&
            currentYear == transactionDate.getFullYear() &&
            currentDay == transactionDate.getDate()
          );
        });
        break;
      }
    }
    if (type)
      transactionsCopy = transactionsCopy.filter((t) => t.category === type);

    setFilteredTransactions(transactionsCopy);
  };
  const changeRange = (range, date = new Date()) => {
    setSelectedRange(range);
    filter(range);
  };
  const changeCategory = (category) => {
    setSelectedCategory(category);
    filter(null, category);
  };

  const getTransactionList = async () => {
    setLoadingList((prev) => [...prev, "transactions"]);
    const response = await fetch(BASE_URL + "/transactions?userId=" + userId);
    const transactions = await response.json();
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    setFilteredTransactions(
      transactions.transactions.filter((t) => {
        const transactionDate = new Date(t.transaction_date);
        return (
          currentMonth == transactionDate.getMonth() &&
          currentYear == transactionDate.getFullYear()
        );
      })
    );
    setTransactionList((_) => transactions.transactions);
    setLoadingList((prev) => {
      return prev.filter((l) => l !== "transactions");
    });
  };

  const createBalance = async (balance) => {
    setLoadingList((prev) => [...prev, "createBalance"]);

    await fetch(BASE_URL + "/createBalance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(balance),
    });
    setLoadingList((prev) => {
      return prev.filter((l) => l !== "createBalance");
    });
    await getBalanceList();
  };

  const createTransaction = async (transaction) => {
    setLoadingList((prev) => [...prev, "createTransaction"]);
    await fetch(BASE_URL + "/createTransaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });
    setLoadingList((prev) => {
      return prev.filter((l) => l !== "createTransaction");
    });
    await getTransactionList();
  };

  return {
    balanceList,
    transactionList,
    loadingList,
    selectedRange,
    selectedCategory,
    filteredTransactions,
    isBalanceSet,
    changeRange,
    changeCategory,
    getBalanceList,
    getTransactionList,
    createBalance,
    createTransaction,
  };
};

export default useBalance;
