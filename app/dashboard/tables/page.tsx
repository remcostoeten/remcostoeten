'use client';

import { Expense } from "@/utils/types"
import { DataTable } from "@/components/dashboard/tables/DataTable"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/utils/firebase"
import { useState, useEffect } from "react"
import { ExpenseColumns } from "@/components/dashboard/tables/Cols"

async function getData(): Promise<Expense[]> {
  const expenseData: Expense[] = []

  const expenseQuerySnapshot = await getDocs(collection(db, 'expenses'))
  expenseQuerySnapshot.forEach((doc) => {
    const data = doc.data()
    expenseData.push({
      id: doc.id,
      expenseAmount: data.expenseAmount,
      name: data.name,
      createdAt: data.createdAt.toDate(),
    })
  })

  return expenseData
}

export default function CombinedExpenses() {
  const [data, setData] = useState<Expense[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const expenses = await getData()
      setData(expenses)
    }
    fetchData()
  }, [])

  return (
    <DataTable columns={ExpenseColumns} data={data} />
  )
}