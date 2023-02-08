import React, { useState } from 'react'
import Header from './components/Header';
import PropertyList from './components/PropertyList';
import TenantsList from './components/TenantsList';

function App() {
  const [page,setPage]=useState('Property')
  function handlePage(page){
setPage(page)
console.log(page)
  }
  return <>
<Header handlePage={handlePage} active={page}/>
{page==='Property' ? <PropertyList/> : <TenantsList/>}
  </>
}

export default App;
