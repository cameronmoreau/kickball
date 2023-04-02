import classNames from "classnames";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export const Table: React.FC<Props> = ({ children }) => (
  <table className="min-w-full max-w-full border-separate border-spacing-0">
    {children}
  </table>
);

export const Th: React.FC<Props> = ({ children }) => (
  <th className="py-4 sticky z-10 top-0 border-b border-gray-200 bg-white font-semibold text-left">
    {children}
  </th>
);

export const TableBody: React.FC<Props> = ({ children }) => (
  <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>
);

export const Td: React.FC<Props> = ({ children, className }) => (
  <td className={classNames("py-4", className)}>{children}</td>
);
