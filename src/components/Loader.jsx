import React from "react";
import styled from "styled-components";

const LoaderWrapper = styled('div')({
    minHeight: '100vh',
    width: '100vw',
    display:'flex',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    position:'absolute',
    left: '0',
    top:'0'
})

function Loader(){
    return <LoaderWrapper>
        <img style={{width: '150px'}}  src='../src/assets/load.gif' />
    </LoaderWrapper>
}

export default Loader