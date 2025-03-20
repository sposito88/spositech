import React, { ReactNode } from 'react';

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => ReactNode;
}

interface AdminTableProps {
  columns: Column[];
  data: any[];
  emptyMessage?: string;
  onRowClick?: (row: any) => void;
}

const AdminTable: React.FC<AdminTableProps> = ({
  columns,
  data,
  emptyMessage = "Nenhum dado encontrado",
  onRowClick
}) => {
  return (
    <div className="table-responsive">
      <table className="table table-dark admin-table mb-0">
        <thead className="table-dark">
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col" className="text-white">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr 
                key={index}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                style={onRowClick ? { cursor: 'pointer' } : undefined}
              >
                {columns.map((column) => (
                  <td key={`${index}-${column.key}`} style={{color: "#FFFFFF"}}>
                    {column.render 
                      ? column.render(row[column.key], row) 
                      : row[column.key]
                    }
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center text-white py-4">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable; 