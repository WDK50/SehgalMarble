// src/AdminApp.jsx
import React from 'react';
import { Admin, Resource } from 'react-admin';
import firebaseDataProvider from 'react-admin-firebase';
import { auth, firestore } from './firebase/config';


import ProductsList    from './admin/ProductsList';
import ProductsEdit    from './admin/ProductsEdit';
import ProductsCreate  from './admin/ProductsCreate';
import SlidersList     from './admin/SlidersList';
import SlidersEdit     from './admin/SlidersEdit';
import SlidersCreate   from './admin/SlidersCreate';

const options = {
  logging: true,
  rootRef: 'carts',              // your orders live in `carts/{userId}` :contentReference[oaicite:0]{index=0}
  watch:   ['carts','products','sliders']
};
const dataProvider = firebaseDataProvider({ auth, firestore }, options);

export default function AdminApp() {
  return (
    <Admin dataProvider={dataProvider}>
      {/* <Resource
        name="carts"
        list={OrdersList}
        options={{ label: 'User Orders' }}
      /> */}
      <Resource
        name="products"
        list={ProductsList}
        edit={ProductsEdit}
        create={ProductsCreate}
      />
      <Resource
        name="sliders"
        list={SlidersList}
        edit={SlidersEdit}
        create={SlidersCreate}
      />
    </Admin>
  );
}
