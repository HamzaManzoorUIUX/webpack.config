import React from 'react';
export default ({handleUndo,handleRedo,handleDragControl,handleDelete,handleCopyRight,handleCopyLeft,setisToolactive,isToolactive,Setgrid,grid})=>{
    return  <div className="topEditor">
        
    <button className="btn img-Box-tool"><img src={require('../../images/icons/7.png')}/>
    </button>
    <button onClick={()=>{
        setisToolactive(!isToolactive)}} className="btn img-Box-tool"><img src={require('../../images/icons/bb2.png')}/>
    </button>
    <button  onClick={()=>{
        Setgrid(!grid)}} className="btn img-Box-tool"><img src={require('../../images/icons/bb4.png')}/>
    </button>
    <button className="btn img-Box-tool"><img src={require('../../images/icons/bb1.png')}/>
    </button>
    <button className="btn img-Box-tool"><img src={require('../../images/icons/bb6.png')}/>
    </button>
    <button className="btn img-Box-tool"><img src={require('../../images/icons/bb7.png')}/>
    </button>
    <button className="btn img-Box-tool"><img src={require('../../images/icons/bb5.png')}/>
    </button>
   
    <button className="btn img-Box-tool"  onClick={()=>{handleCopyLeft()}}><img src={require('../../images/icons/9.png')}/>
    </button>
    <button className="btn img-Box-tool"  onClick={()=>{handleCopyRight()}}><img src={require('../../images/icons/10.png')}/>
    </button>
    <button className="btn img-Box-tool" onClick={()=>{handleDelete()}}><img src={require('../../images/icons/11.png')}/>
    </button>
    <button className="btn img-Box-tool" onClick={()=>{handleDragControl()}}><img src={require('../../images/icons/2.png')}/>
    </button>
    <button className="btn img-Box-tool" onClick={()=>{handleDragControl()}}><img src={require('../../images/icons/2c.png')}/>
    </button>
    <button onClick={()=>{handleUndo()}} className="btn img-Box-tool"><img src={require('../../images/icons/5.png')}/>
    </button>
    <button onClick={()=>{handleRedo()}} className="btn img-Box-tool"><img src={require('../../images/icons/6.png')}/>
    </button>
    <button className="btn img-Box-tool"><img src={require('../../images/icons/8.png')}/>
    </button>
</div>


}