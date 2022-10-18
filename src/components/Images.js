import React, {useEffect, useState} from 'react';
import {ImageList, ImageListItem,
  Box, Button, IconButton, InputBase, ButtonGroup} from '@mui/material/';
import Modal from './Modal';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';

const Images=()=>{
  const [searchTerm, setTerm]= useState('car');
  const [results, setResults]=useState([]);
  const [open, setOpen]=useState(false);
  const [clickedImg, setClickedImg] = useState('');

  useEffect(()=>{
    const search =async ()=>{
      const {data}= await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=636e1481b4f3c446d26b8eb6ebfe7127&tags=${searchTerm}&per_page=24&format=json&nojsoncallback=1`);
      setResults(data.photos.photo);
    };

    if (searchTerm && !results.length) {
      search();
    } else {
      const timeoutId= setTimeout(()=>{
        if (searchTerm) {
          search();
        }
      }, 1000);
      return ()=>{
        clearTimeout(timeoutId);
      };
    }
  }, [searchTerm]);

  return (
    <div style={{padding: '7px'}}>
      <br/>
      <Box textAlign='center'>

        <InputBase value={searchTerm}
          onChange={(e)=>setTerm(e.target.value)}
          sx={{ml: 1, flex: 1}}
          placeholder="Search..."
        />
        <IconButton type="button" sx={{p: '10px'}} aria-label="search">
          <SearchIcon />
        </IconButton>
        <br/>
        <ButtonGroup container justify = "center" variant="text"
          aria-label="text button group">
          <Button onClick={()=>setTerm('Technology')}>Tech</Button>
          <Button onClick={()=>setTerm('Mobile')}>Mobile</Button>
          <Button onClick={()=>setTerm('Fitness')}>Fitness</Button>
          <Button onClick={()=>setTerm('Music')}>Music</Button>
        </ButtonGroup>
      </Box>

      <ImageList
        variant="masonry" cols={3} gap={8}
      >
        {results?.map((pic) => (
          <ImageListItem key={pic.id}>
            <img
              src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`}
              alt={pic.title}
              loading="lazy"
              onClick={() => {
                setOpen(true), setClickedImg(`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_c.jpg`);
              }} />
          </ImageListItem>
        ))}

      </ImageList>
      <Modal
        open={open}
        close={()=>setOpen(false)}
        clickedImg={clickedImg}
      />
    </div>
  );
};
export default Images;
