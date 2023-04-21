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
    maxHeight: 800
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
    width: '100%'
  },
  cropContainer: {
    position: 'relative',
    width: '100%',
    maxHeight: 800,
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

  const [loadedImages, setLoadedImages] = useState([]);
  const [currentImg, setCurrentImg] = useState(null)
  const [imageSrc, setImageSrc] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [aspect, setAspect] = useState(4 / 3)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [showCropArea, setShowCropArea] = useState(false);
  const [remoteFilename, setRemoteFilename] = useState(false);

  const onCropComplete = (croppedArea, croppedAreaPixelsX) => {
    setCroppedAreaPixels(croppedAreaPixelsX)
  }

  const uploadCroppedImage = async () => {
    try {
      const currentImage = loadedImages.find(o => o.name === currentImg)
      const currentImageIndex = loadedImages.findIndex(o => o.name === currentImg)

      const croppedBlob = await getCroppedImg(
        currentImage.imageSrc,
        croppedAreaPixels
      )

      const croppedImage = new File([croppedBlob], remoteFilename ? remoteFilename : 'tmpImage.webp', {
        type: croppedBlob.type
      });

      if (croppedImage) {

        const response = await dispatch(uploadImage(croppedImage));

        setTimeout(() => {
          setLoadedImages(oldArray => [
            ...oldArray.slice(0, currentImageIndex),
            { ...currentImage, croppedImage: response['src'], filename: response['filename'] },
            ...oldArray.slice(currentImageIndex + 1)]
          )
        }, 0)

        setShowCropArea(false)

      }
    } catch (e) {
      console.log('uploadCroppedImage ERROR: ', e)
    }
  }

  const cancelCroppedImage = () => {
    setShowCropArea(false)
  }

  const handleDrop = useCallback((acceptedFiles) => {
    // Cancel if name already exists ???
    newImage(acceptedFiles)
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    preventDropOnDocument: true
  });

  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.addEventListener('load', () => resolve(reader.result), false)
      reader.readAsDataURL(file)
    })
  }

  const newImage = async (files) => {
    if (files && files.length > 0) {
      const file = files[files.length - 1]

      let imageDataUrl = await readFile(file)
      setLoadedImages(oldArray => [...oldArray, { name: file.name, imageSrc: imageDataUrl, croppedImage: null, filename: null }]);

      editImage(file.name, imageDataUrl)
      editImage({ name: file.name, imageSrc: imageDataUrl, filename: null })
    }
  }

  const editImage = async (file) => {
    setCurrentImg(file.name)
    setImageSrc(file.imageSrc)
    setRemoteFilename(file.filename)
    setShowCropArea(true)
  }

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
        {/* <input type="file" onChange={newImage} accept="image/*" /> */}
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
                  {/* <ListItemIcon>
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
                  </Tooltip> */}
                  {file.croppedImage && (
                    <img
                      onClick={() => editImage(file)}
                      file={file.name}
                      src={file.croppedImage ? file.croppedImage : file.imageSrc}
                      alt="Cropped"
                      className={classes.img}
                    />
                  )}
                </ListItem>
              ))}
            </List>
          </PerfectScrollbar>
        </>
      )}


      <Dialog
        maxWidth="md"
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
                aspect={aspect}
                // aspect={4 / 3}
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
                onClick={cancelCroppedImage}
              >
                Cancel
              </Button>
              <Button
                onClick={uploadCroppedImage}
                variant="contained"
                color="primary"
                classes={{ root: classes.cropButton }}
              >
                Save Image
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
