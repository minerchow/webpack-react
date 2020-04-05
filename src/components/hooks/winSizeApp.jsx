import React from 'react';
import UseWinSize from './winSize';
function WinSizeApp(){

    const size = UseWinSize()
    return (
        <div>页面Size:{size.width}x{size.height}</div>
    )
}

export default WinSizeApp