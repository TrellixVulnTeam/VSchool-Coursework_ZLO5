import React, { useState } from 'react';

// ** finish error handling and display **
export default function UserMemes(props){
    const { 
        imgSrc,
        key,
        setMemes,
        tempID,
        _api_id,
        created,
        initialUrl,
        submitMeme,
        setUserMemes
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
        _api_id: _api_id,
        created: created
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
        prevImg.append('template_id', _api_id)
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
    const handleEdit = (e, id) => {
        e.preventDefault()
        const createdDate = JSON.stringify(new Date()).slice(0,11)
        const captionData = new FormData();
        captionData.append('username', 'vschoolproject')
        captionData.append('password', 'testing!2021')
        captionData.append('template_id', _api_id)
        captionData.append('text0', inputs.topText)
        captionData.append('text1', inputs.bottomText)
        fetch(`https://api.imgflip.com/caption_image`, {
            method: 'POST',
            body: captionData,
        })
        .then(res => res.json())
        .then((res) => {
            // setMemes(prevState => ([
            //     ...prevState.filter(memes => memes.tempID !== id), {
            //     imgSrc: res.data.url,
            //     initialUrl: initialUrl,
            //     tempID: res.data.page_url.slice(22),
            //     _api_id: _api_id,
            //     created: createdDate
            // }])
            // )
            setUserMemes(prevState => ([
                // filter or map prevState to find meme with matching prev tempID passed through
                // set the id to the new tempID ^^logic in tempID for setMemes above^^ set new imgSrc too
                ...prevState.filter(meme => meme.tempID !== id), res.data
            ]))
        }
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
            { !toggleEdit ?
                <div className='m-auto p-0 h-auto w-auto'>
                    <p className='text-xs'> tempID:'{tempID}' created: {created} </p>
                    <img src={imgSrc} alt={key}/>
                    <button className='text-sm m-1 mt-1 p-1 rounded bg-soot text-white' onClick={()=> { setToggleEdit(prevState => !prevState) }}> edit </button>
                    <button className='text-sm m-1 mt-1 p-1 rounded bg-navy text-white' onClick={() => { submitMeme(imgSrc, initialUrl, _api_id) }}> submit </button>
                    <button className='text-sm m-1 mt-1 p-1 rounded bg-salmon text-gray-700' onClick={() => deleteMeme(tempID)}> delete </button>
                </div>
                :
                <div>
                    <p className='text-xs'> tempID:'{tempID}' created: {created} </p>
                    <img src={imgEditable.imgSrc} alt='editableImage'/>
                        <input name='topText' placeholder='Box one text' value={inputs.topText} onChange={handleChangeEdit}/>
                        <input name='bottomText' placeholder='Box two text' value={inputs.bottomText} onChange={handleChangeEdit}/>
                    <button className='text-sm m-2 p-1 rounded bg-salmon' onClick={()=> setToggleEdit(prevState => !prevState)}> cancel </button>
                    <button className='text-sm m-2 p-1 rounded bg-soot text-white' onClick={(e) => handleEdit(e,tempID)}> save </button>
                </div>
            }
        </div>
        )
}