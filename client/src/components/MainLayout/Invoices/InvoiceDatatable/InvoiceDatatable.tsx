"use client"

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table"
import type { ColumnDef, SortingState } from "@tanstack/react-table"
import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Invoice {
  id: number
  vendor_name: string
  amount: number
  due_date: string
  description: string
  paid: boolean
}

interface DataTableProps {
  columns: ColumnDef<Invoice, any>[]
  data: Invoice[]
  pageIndex: number
  pageSize: number
  totalCount: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  onRowSelect: (id: number) => void
  isLoading?: boolean
}

const InvoiceDatatable = ({
  columns,
  data,
  pageIndex,
  pageSize,
  totalCount,
  onPageChange,
  onPageSizeChange,
  onRowSelect,
  isLoading,
}: DataTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: { sorting, pagination: { pageIndex, pageSize } },
    onSortingChange: setSorting,
    manualPagination: true,
    pageCount: Math.ceil(totalCount / pageSize),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-[var(--brighter-purple)]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center text-gray-500">
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow onClick={() => onRowSelect(row.original.id)} key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center text-gray-500">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex items-center space-x-2">
          <button
            className="rounded border px-2 py-1 text-sm"
            onClick={() => onPageChange(Math.max(pageIndex - 1, 0))}
            disabled={pageIndex === 0}
          >
            Previous
          </button>
          <button
            className="rounded border px-2 py-1 text-sm"
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={pageIndex + 1 >= table.getPageCount()}
          >
            Next
          </button>
        </div>

        <div className="text-sm text-gray-600">
          Page {pageIndex + 1} of {table.getPageCount()} — Total {totalCount} items
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Rows per page:</span>
          <select
            className="rounded border px-2 py-1 text-sm"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default InvoiceDatatable
