import React, { useState } from 'react';

// ** finish error handling and display **
// figure out why it isn't displaying fully on screen
export default function UserMemes(props){
    const { 
        imgSrc,
        key,
        setMemes,
        tempID,
        id,
        initialUrl
    } = props

    const [ toggleEdit, setToggleEdit ] = useState(false)
    const [ inputs, setInputs ] = useState({
        topText: '',
        bottomText: ''
    });

    const [ imgEditable, setImgEditable ] = useState({
        imgSrc: initialUrl,
        initialUrl: initialUrl,
        tempID: tempID,
        id: id
    })
    
    // *** error: stop rendering if nothing to render after deletion; on delete at 0 index prevState not iterable error
    const deleteMeme = (id) => {
        setMemes(prevMemes => {
            prevMemes.userMemes.filter(memes => memes.tempID !== id)
        })
    }
    
    const editPrev = () => {
        const prevImg = new FormData();
        prevImg.append('username', 'vschoolproject')
        prevImg.append('password', 'testing!2021')
        prevImg.append('template_id', id)
        prevImg.append('text0', inputs.topText)
        prevImg.append('text1', inputs.bottomText)
        fetch(`https://api.imgflip.com/caption_image`, {
            method: 'POST',
            body: prevImg,
        })
        .then(res => res.json())
        .then((res) => 
            setImgEditable(prevInputs => ({
                ...prevInputs, 
                imgSrc: res.data ? res.data.url : imgEditable.imgSrc,
            }))
        )
        .catch(err => console.log(err))
    }
    
    function handleChangeEdit(e){
        const { name, value } = e.target
            setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value,
        }), editPrev()
        );
    };
    // submits the edit
    const handleEdit = (e) => {
        e.preventDefault()
        const captionData = new FormData();
        captionData.append('username', 'vschoolproject')
        captionData.append('password', 'testing!2021')
        captionData.append('template_id', id)
        captionData.append('text0', inputs.topText)
        captionData.append('text1', inputs.bottomText)
        fetch(`https://api.imgflip.com/caption_image`, {
            method: 'POST',
            body: captionData,
        })
        .then(res => res.json())
        .then((res) => {
            setMemes(prevState => ([
                prevState.filter(memes => memes.tempID === tempID), {
                imgSrc: res.data,
                initialUrl: initialUrl,
                tempID: res.data.page_url.slice(22),
                id: id
            }])
            )}
        )
        .finally(
            setToggleEdit(prevState => !prevState))
            // ** finish error handling and display **
        .catch(err => console.log(err))
        setInputs({
            topText: '',
            bottomText: ''
        })
    }

    return(
        <div className='bg-cream p-4'>
            { toggleEdit === false ?
                <form className='m-auto p-0 h-auto w-auto'>
                    <img src={imgSrc} alt={key}/>
                    <button className='m-1 mt-1 p-1 rounded bg-soot text-white' onClick={()=> setToggleEdit(prevState => !prevState)}> edit </button>
                    <button className='m-1 mt-1 p-1 rounded bg-salmon text-gray-700' onClick={() => deleteMeme(tempID)}> delete </button>
                </form>
                :
                <form>
                    <img src={imgEditable.imgSrc} alt='editableImage'/>
                        <input name='topText' placeholder='Box one text' value={inputs.topText} onChange={handleChangeEdit}/>
                        <input name='bottomText' placeholder='Box two text' value={inputs.bottomText} onChange={handleChangeEdit}/>
                    <button className='m-2 p-1 rounded bg-salmon' onClick={()=> setToggleEdit(prevState => !prevState)}> cancel edit </button>
                    <button className='m-2 p-1 rounded bg-soot text-white' onClick={handleEdit}> submit edit </button>
                </form>
            }
        </div>
        )
}