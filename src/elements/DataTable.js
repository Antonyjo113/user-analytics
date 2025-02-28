/* Import Section */
import React, { useState, useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';


const Datatable = (props) => {
    const { columns, headerGroup, value, subheader } = props;

    const dynamicColumns = columns.filter(col => col.visible !== false).map((col) => (
        <Column key={col.field} field={col.field} header={col.header} body={col.body} sortable={col.sortable} style={col.style} />
    ));

    const headerGroupReturn = ( subheader? (
        <ColumnGroup>
            <Row>
                {headerGroup.map((col, index) => (
                    <Column key={index} header={col.header} colSpan={1}  style={col.style}/>
                ))}
            </Row>
            <Row>
                {headerGroup.map((col, index) => (
                    <Column key={index} header={col.subheader}  style={col.style}/>
                ))}
            </Row>
        </ColumnGroup>
    ): '');

    return (
        <div>
            { value && (
                <DataTable value={value} headerColumnGroup={headerGroupReturn} scrollable={true}>
                    {dynamicColumns}
                </DataTable>
            )}
        </div>
    );
};

export default Datatable;