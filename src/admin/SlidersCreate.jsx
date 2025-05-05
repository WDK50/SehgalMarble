// src/admin/SlidersCreate.jsx
import React from 'react';
import { Create, SimpleForm, TextInput, ImageInput, ImageField } from 'react-admin';

export default function SlidersCreate(props) {
  return (
    <Create {...props} title="Add Slider">
      <SimpleForm>
        <TextInput source="title" />
        <TextInput source="subtitle" />
        <ImageInput source="image" label="Slider Image" accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>
      </SimpleForm>
    </Create>
  );
}
