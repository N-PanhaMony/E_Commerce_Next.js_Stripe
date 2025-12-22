import ReactDom from 'react-dom'

export default function Portal(props){
    const {handleClonePortal , children} =props

    return ReactDom.createPortal(
        <div className='portal-container'>
            <div onClick={handleClonePortal} className='portal-underlay'/>
            {children}
        </div>,
        document.getElementById('portal')
    )
}  