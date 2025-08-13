'use client'
import React from 'react'
import useSWR from 'swr'

const fetcher = (url:string) => fetch(url).then(r=>r.json())

export default function Dashboard(){
  const {data, error} = useSWR('/api/market?symbol=EURUSD', fetcher)
  if(error) return <div>Error: {String(error)}</div>
  if(!data) return <div>Loading…</div>
  return (
    <div style={{padding:24}}>
      <h2>Dashboard — {data.symbol}</h2>
      <p>Bias: <strong>{data.analysis.bias}</strong></p>
      <h3>Latest FVGs</h3>
      <pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(data.analysis.fvgs.slice(-5),null,2)}</pre>
      <h3>Order Blocks</h3>
      <pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(data.analysis.obs.slice(-5),null,2)}</pre>
    </div>
  )
}