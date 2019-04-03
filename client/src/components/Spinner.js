import React from 'react'
import spinnerImage from '../final project/spinner.gif'
export const Spinner = ()=>{
    return <div style={{textAlign:"center", display:'flex', justifyContent:'center', flexGrow:"1"}}><img src={spinnerImage} width="80px" height="80px" style={{margin:"200px 0"}} /></div>
}