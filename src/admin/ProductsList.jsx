// src/admin/ProductsList.jsx
import React from 'react';
import {
  List, Datagrid, TextField, NumberField, EditButton, DeleteButton
} from 'react-admin';

export default function ProductsList(props) {
  return (
    <List {...props} title="Products">
      <Datagrid>
        <TextField source="code" />
        <TextField source="name" />
        <NumberField source="price" options={{ style: 'currency', currency: 'PKR' }} />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
}
