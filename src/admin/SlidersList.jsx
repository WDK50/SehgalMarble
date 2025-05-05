// src/admin/SlidersList.jsx
import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin';

export default function SlidersList(props) {
  return (
    <List {...props} title="Homepage Sliders">
      <Datagrid>
        <TextField source="title" />
        <TextField source="subtitle" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
}
