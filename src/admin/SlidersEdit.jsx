// src/admin/SlidersEdit.jsx
import React from 'react';
import { Edit, SimpleForm, TextInput, ImageInput, ImageField } from 'react-admin';

export default function SlidersEdit(props) {
  return (
    <Edit {...props} title="Edit Slider">
      <SimpleForm>
        <TextInput source="title" />
        <TextInput source="subtitle" />
        <ImageInput source="image" label="Slider Image" accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>
      </SimpleForm>
    </Edit>
  );
}
