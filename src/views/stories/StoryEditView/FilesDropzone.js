/* eslint-disable react/no-array-index-key */
import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  makeStyles
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import MoreIcon from '@material-ui/icons/MoreVert';
import bytesToSize from 'src/utils/bytesToSize';
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider'
import { getCroppedImg } from '../../../utils/canvas'
import { CompareArrowsOutlined, TimerOutlined } from '@material-ui/icons';
import { uploadImage } from 'src/store/actions/storyActions';
import {
  useDispatch,
  useSelector
} from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {},
  dropZone: {
    border: `1px dashed ${theme.palette.divider}`,
    padding: theme.spacing(6),
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      opacity: 0.5,
      cursor: 'pointer'
    }
  },
  dragActive: {
    backgroundColor: theme.palette.action.active,
    opacity: 0.5
  },
  image: {
    width: 130
  },
  info: {
    marginTop: theme.spacing(1)
  },
  list: {
    maxHeight: 320
  },
  actions: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  },


  cropAreaHidden: {
    visibility: 'hidden',
    height: 0
  },
  cropArea: {
    width: 500,
  },
  cropContainer: {
    position: 'relative',
    width: 500,
    maxHeight: 500,
    background: '#333',
    [theme.breakpoints.up('sm')]: {
      height: 500,
    },

  },
  cropButton: {
    flexShrink: 0,
    marginLeft: 16,
  },
  controls: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  sliderContainer: {
    display: 'flex',
    flex: '1',
    alignItems: 'center',
  },
  sliderLabel: {
    [theme.breakpoints.down('xs')]: {
      minWidth: 65,
    },
  },
  slider: {
    padding: '22px 0px',
    marginLeft: 16,
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: '0 16px',
    },
  },
  img: {
    maxWidth: '100%',
    width: '100%',
  },




}));

function FilesDropzone({ className, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [files, setFiles] = useState([]);
  const [loadedImages, setLoadedImages] = useState([]);


  const [currentImg, setCurrentImg] = useState(null)
  const [imageSrc, setImageSrc] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const [showCropArea, setShowCropArea] = useState(false);
  const [imageFirstLoad, setImageFirstLoad] = useState(false);
  const [calculateArea, setCalculateArea] = useState(true);

  useEffect(() => {
    if (!imageFirstLoad) {
      // console.log('-----croppedAreaPixels----', croppedAreaPixels)
      setImageFirstLoad(true)
      // showCroppedImage()
    }
  }, [croppedAreaPixels]);

  const displayCropArea = () => {
    setShowCropArea(true)
    setCalculateArea(true)
  }

  const onCropComplete = (croppedArea, croppedAreaPixelsX) => {
    // console.log('croppedAreaPixelsX==> 3 ', croppedAreaPixelsX)
    console.log('loadedImages::::(3)', loadedImages)
    setCroppedAreaPixels(croppedAreaPixelsX)



  }

  function convertCanvasToImage() {
    let canvas = document.getElementById("canvas");
    let image = new Image();
    image.src = canvas.toDataURL();
    return image;
  }

  const showCroppedImage = async () => {
    try {
      // Upload image




      console.log('currentImg', currentImg)
      console.log('loadedImages::::(4)', loadedImages)
      console.log('loadedImages.name', loadedImages.name)


      const currentImage = loadedImages.find(o => o.name === currentImg)
      const currentImageIndex = loadedImages.findIndex(o => o.name === currentImg)
      console.log('currentImageIndex', currentImageIndex)
      console.log('currentImage', currentImage)
      // console.log('imageSrc', imageSrc)


      const croppedBlob = await getCroppedImg(
        currentImage.imageSrc,
        croppedAreaPixels
      )
      console.log('croppedImage>>>>>', croppedBlob)

      const croppedImage = new File([croppedBlob], 'image.jpeg', {
        type: croppedBlob.type,
      });

      if (croppedImage) {

        const response = await dispatch(uploadImage(croppedImage));

        console.log('done', croppedImage)
        console.log('response', response)
        setCroppedImage(croppedImage)

        // http://localhost:5000/tmp/file-1681600075607.jpeg

        // setLoadedImages(oldArray => [...oldArray, { name: file.name, imageSrc: imageDataUrl, croppedImage: null }]);

        // setLoadedImages(oldArray => oldArray.map((item, i) => {
        //   console.log('item.name === currentImage.name', item.name, currentImage.name)
        //   return item.name === currentImage.name ? { ...item, croppedImage: croppedImage } : item
        // }
        // ));

        setTimeout(() => {
          setLoadedImages(oldArray => [
            ...oldArray.slice(0, currentImageIndex),
            { ...currentImage, imageSrc: response['src'] },
            // { ...currentImage, croppedImage },
            ...oldArray.slice(currentImageIndex + 1)]
          )
        }, 1000)



        setShowCropArea(false) //false
        // setTimeout(() => {
        setCalculateArea(false)
        // }, "1000")
      }
    } catch (e) {
      console.log('showCroppedImage ERROR')
      // console.error(e)
    }
  }

  const handleDrop = useCallback((acceptedFiles) => {
    console.log('acceptedFiles----->', acceptedFiles)
    // Cancel if name already exists
    setFiles((prevFiles) => [...prevFiles].concat(acceptedFiles));
    onFileChange(acceptedFiles)

  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop
  });

  // const handleRemoveAll = () => {
  //   setFiles([]);
  // };


  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.addEventListener('load', () => resolve(reader.result), false)
      reader.readAsDataURL(file)
    })
  }

  const onFileChange = async (files) => {

    if (files && files.length > 0) {
      setCroppedImage(null)
      setCalculateArea(true)
      setShowCropArea(true) // false
      setImageFirstLoad(false)
      const file = files[files.length - 1]

      console.log('file====>', file)
      console.log(file)


      // await dispatch(uploadImage(file));





      let imageDataUrl = await readFile(file)
      console.log('setLoadedImages ++++++++++++++++++++++++++++++++++')
      setLoadedImages(oldArray => [...oldArray, { name: file.name, imageSrc: imageDataUrl, croppedImage: null }]);

      setCurrentImg(file.name)
      // setLoadedImages([{ name: file.name }])
      console.log('imageDataUrl::::', imageDataUrl)
      console.log('file::::', file)
      console.log('file.name::::', file.name)
      console.log('loadedImages::::(1) ', loadedImages)
      // console.log('files::::', files)

      // console.log('loadedImages[0].imageDataUrl::::', loadedImages[0].imageDataUrl)

      setImageSrc(imageDataUrl)

      setTimeout(() => {
        setCalculateArea(false)
        console.log('loadedImages::::(2)', loadedImages)
      }, 1000)
    }
  }


  useEffect(() => {
    console.log('loadedImages====>', loadedImages)
  }, [loadedImages])

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <div
        className={clsx({
          [classes.dropZone]: true,
          [classes.dragActive]: isDragActive
        })}
        {...getRootProps()}
      >
        {/* <input type="file" onChange={onFileChange} accept="image/*" /> */}
        <input {...getInputProps()} />
        <div>
          <img
            alt="Select file"
            className={classes.image}
            src="/static/images/undraw_add_file2_gvbb.svg"
          />
        </div>
      </div>
      {loadedImages.length > 0 && (
        <>
          <PerfectScrollbar options={{ suppressScroll: false }}>
            <List className={classes.list}>
              {loadedImages.map((file, i) => (
                <ListItem
                  divider={i < loadedImages.length - 1}
                  key={i}
                >
                  <ListItemIcon>
                    <ImageIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={file.name}
                    primaryTypographyProps={{ variant: 'h5' }}
                    secondary={bytesToSize(file.size)}
                  />
                  <Tooltip title="More options">
                    <IconButton edge="end">
                      <MoreIcon />
                    </IconButton>
                  </Tooltip>
                  <img
                    onClick={displayCropArea}
                    src={file.imageSrc}
                    alt="Cropped"
                    className={classes.img}
                  />
                </ListItem>
              ))}
            </List>
          </PerfectScrollbar>
        </>
      )}


      <Dialog
        maxWidth="sm"
        fullWidth
        open={!!(imageSrc && showCropArea)}
        {...rest}
      >
        {imageSrc && (
          <div className={showCropArea ? classes.cropArea : classes.cropAreaHidden}>
            <div className={classes.cropContainer}>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className={classes.controls}>
              <div className={classes.sliderContainer}>
                <Typography
                  variant="overline"
                  classes={{ root: classes.sliderLabel }}
                >
                  Zoom
                </Typography>
                <Slider
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  classes={{ root: classes.slider }}
                  onChange={(e, zoom) => setZoom(zoom)}
                />
              </div>
              <Button
                onClick={showCroppedImage}
                variant="contained"
                color="primary"
                classes={{ root: classes.cropButton }}
              >
                Show Result
              </Button>
            </div>
          </div>
        )}

      </Dialog>




    </div>
  );
}

FilesDropzone.propTypes = {
  className: PropTypes.string
};

export default FilesDropzone;
