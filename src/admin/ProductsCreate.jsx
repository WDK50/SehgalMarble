// src/admin/ProductsCreate.jsx
import React from 'react';
import {
  Create, SimpleForm, TextInput, NumberInput, ArrayInput, SimpleFormIterator
} from 'react-admin';

export default function ProductsCreate(props) {
  return (
    <Create {...props} title="Add Product">
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
    </Create>
  );
}
