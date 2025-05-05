// src/admin/ProductsEdit.jsx
import React from 'react';
import {
  Edit, SimpleForm, TextInput, NumberInput, ArrayInput, SimpleFormIterator
} from 'react-admin';

export default function ProductsEdit(props) {
  return (
    <Edit {...props} title="Edit Product">
      <SimpleForm>
        <TextInput source="code" />
        <TextInput source="name" />
        <NumberInput source="price" />
        <ArrayInput source="sizes">
          <SimpleFormIterator>
            <TextInput />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  );
}
