import * as React from "react"
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  MoreHorizontalIcon,
  Search01Icon,
  UnfoldMoreIcon,
} from "@hugeicons/core-free-icons"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { toast } from "sonner"

import { Icon } from "@/components/icon"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Payment = {
  id: string
  email: string
  status: "Paid" | "Pending" | "Failed"
  method: "Card" | "Wire" | "ACH"
  amount: number
}

const statuses: Payment["status"][] = ["Paid", "Pending", "Failed", "Paid", "Paid"]
const methods: Payment["method"][] = ["Card", "Wire", "ACH"]
const names = ["aiko", "omar", "lena", "ravi", "sofia", "mira", "jonas", "priya", "tomas", "hana", "diego", "noor", "ines", "kenji"]

const data: Payment[] = names.map((name, index) => ({
  id: `PAY-${2301 + index}`,
  email: `${name}@example.com`,
  status: statuses[index % statuses.length],
  method: methods[index % methods.length],
  amount: 120 + ((index * 337) % 1900),
}))

function SortHeader({ column, label, end }: { column: Column<Payment>; label: string; end?: boolean }) {
  const sorted = column.getIsSorted()
  return (
    <Button
      variant="ghost"
      size="sm"
      className={end ? "-mr-3 ml-auto flex" : "-ml-3"}
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      {label}
      <Icon icon={sorted === "asc" ? ArrowUp01Icon : sorted === "desc" ? ArrowDown01Icon : UnfoldMoreIcon} />
    </Button>
  )
}

const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all rows on this page"
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label={`Select ${row.original.id}`}
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },
  {
    accessorKey: "id",
    header: "Payment",
    cell: ({ row }) => <span className="text-muted-foreground tabular-nums">{row.original.id}</span>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <SortHeader column={column} label="Email" />,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <Badge variant={status === "Failed" ? "destructive" : status === "Paid" ? "secondary" : "outline"}>
          {status}
        </Badge>
      )
    },
  },
  { accessorKey: "method", header: "Method" },
  {
    accessorKey: "amount",
    header: ({ column }) => <SortHeader column={column} label="Amount" end />,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {row.original.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-xs" aria-label={`Actions for ${row.original.id}`}>
            <Icon icon={MoreHorizontalIcon} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{row.original.id}</DropdownMenuLabel>
          <DropdownMenuItem onSelect={() => toast(`Copied ${row.original.id}`)}>Copy payment ID</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View customer</DropdownMenuItem>
          <DropdownMenuItem>View payment</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    initialState: { pagination: { pageSize: 5 } },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <InputGroup className="w-full sm:w-64">
          <InputGroupAddon><Icon icon={Search01Icon} /></InputGroupAddon>
          <InputGroupInput
            aria-label="Filter emails"
            placeholder="Filter emails…"
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
          />
        </InputGroup>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <Icon icon={ArrowDown01Icon} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  onSelect={(event) => event.preventDefault()}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="overflow-hidden rounded-2xl border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  No payments match that filter.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
        <span>
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} selected
        </span>
        <div className="flex items-center gap-2">
          <span className="tabular-nums">
            Page {table.getState().pagination.pageIndex + 1} of {Math.max(table.getPageCount(), 1)}
          </span>
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
