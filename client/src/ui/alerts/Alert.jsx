import React from 'react'

import styled from 'styled-components'



const St_AlertPanel = styled.div`
    padding:.5rem;
    border: 1px solid #e60000;
    /* background-color: #e60000; */
    color: #e60000;
`


export default function Alert({message}) {
  return (
    <St_AlertPanel>
        <p>{message}</p>
    </St_AlertPanel>
  )
}
