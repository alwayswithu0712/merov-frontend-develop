import React from 'react';
import styled from 'styled-components';
import COLORS from '../../foundation/colors';

interface DataHorizontal {
    title: string;
    text: string | number;
}

export interface DataVertical {
    data: string[] | number[];
}

export enum VARIANT {
    HORIZONTAL = 'HORIZONTAL',
    VERTICAL = 'VERTICAL',
}

export interface TableProps {
    data: DataHorizontal[] | DataVertical[];
    className?: string;
    variant: VARIANT;
    tableHead?: string[];
}

export default function Table({ className, variant, tableHead, data }: TableProps) {
    return (
        <table className={` w-full divide-y divide-gray-300 ${className}`}>
            {tableHead && (
                <thead>
                    <tr>
                        {tableHead.map((header, index) => (
                            <th key={index} scope="col" className="text-left text-sm font-semibold">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
            )}

            <tbody className="divide-y divide-gray-600 ">
                {data.map((item: any, index: number) => (
                    <>
                        {variant === VARIANT.VERTICAL ? (
                            <>
                                <tr key={index}>
                                    {item.data.map((it: any, index: number) => (
                                        <td key={index} className="whitespace-nowrap text-sm py-4">
                                            {it}
                                        </td>
                                    ))}
                                </tr>
                            </>
                        ) : (
                            <>
                                <TrStyled key={index}>
                                    <td className="text-sm font-medium text-white w-40">{item.title}</td>
                                    <td className="text-sm text-gray-300 w-full">{item.text}</td>
                                </TrStyled>
                            </>
                        )}
                    </>
                ))}
            </tbody>
        </table>
    );
}

const TrStyled = styled.tr`
    display: flex;
    border-bottom: 1px solid ${COLORS.STROKEGREY};
    padding: 16px;
`;
