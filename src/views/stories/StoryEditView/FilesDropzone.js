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
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PageviewIcon from '@mui/icons-material/Pageview';
import CropIcon from '@mui/icons-material/Crop';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import bytesToSize from 'src/utils/bytesToSize';
import Cropper from 'react-easy-crop'
import { Slider } from '@mui/material';
import { getCroppedImg } from '../../../utils/canvas'
// import { CompareArrowsOutlined, TimerOutlined } from '@mui/icons-material';
import { uploadImage, deleteFile } from 'src/store/actions/storyActions';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { AspectRatios } from '../../../constants';
import JooTextField from '../../../components/JooTextField';

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
    padding: 0,
    maxHeight: 800
  },
  listElement: {
    display: 'grid'
  },
  listIcon: {
    cursor: 'pointer'
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
  aspectRatioContainer: {
    minWidth: 60,
    paddingRight: 20
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
    width: '94%',
    marginRight: '5px'
  },
  imgEditable: {
    width: '94%',
    marginRight: '5px',
    cursor: 'pointer'
  },
  denseInput: {
    margin: '2px 0',
  },

  deleteContainer: {
    // position: 'relative',
    width: '100%',
    padding: '1rem 1rem 0 1rem',
    maxHeight: 800,
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      height: 500,
    }
  },
  deleteImg: {
    maxHeight: 484
  },
  deleteControls: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row-reverse',
      alignItems: 'center',
    },
  },
  deleteButton: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark
    },
    marginLeft: 16,
  },
}));

function FilesDropzone({ className, onImageUpdate, initialImages, imagePath, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { tenant } = useSelector((state) => state.tenant);

  const [serverImages, setServerImages] = useState(initialImages);
  const [loadedImages, setLoadedImages] = useState([]);
  const [currentImg, setCurrentImg] = useState(null)
  const [imageSrc, setImageSrc] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [aspect, setAspect] = useState({ id: 16 / 9, name: '16:9' })
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
        const response = await dispatch(uploadImage(tenant.tenant, croppedImage));

        setTimeout(() => {
          setLoadedImages(oldArray => [
            ...oldArray.slice(0, currentImageIndex),
            { ...currentImage, croppedImage: response['src'], filename: response['filename'], ratio: aspect.name, label: '' },
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

  const [deleteImage, setDeleteImage] = useState(null)
  const [viewImage, setViewImage] = useState(null)
  const [isDeleteImageInitial, setIsDeleteImageInitial] = useState(null)

  const onViewImage = (fileName, isInitialImage) => {
    setViewImage(fileName)
    setIsDeleteImageInitial(isInitialImage)
  }

  const onDeleteImage = (fileName, isInitialImage) => {
    setDeleteImage(fileName)
    setIsDeleteImageInitial(isInitialImage)
  }

  const cancelViewOrDeleteImage = () => {
    setDeleteImage(null)
    setViewImage(null)
  }

  const confirmDeleteImage = () => {
    if (isDeleteImageInitial) {
      setServerImages(serverImages.filter((image) => image.filename !== deleteImage))
      setDeleteImage(null)
    } else {
      setLoadedImages(loadedImages.filter((image) => image.filename !== deleteImage))
      // Delete image from server
      console.log('====>', deleteImage)
      dispatch(deleteFile(tenant.tenant, deleteImage));
      setDeleteImage(null)
    }
  }

  const handleAspectChange = (event) => {
    // event.persist();
    const selRatio = AspectRatios.find(element => element.id === Number(event.target.value));
    setAspect(selRatio);
  };

  useEffect(() => {
    onImageUpdate(serverImages, loadedImages)
  }, [serverImages, loadedImages])

  // useEffect(() => {
  //   console.log('initialImages:::::', initialImages)
  //   console.log('serverImages:::::', serverImages)
  // }, [initialImages])

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
      {(serverImages?.length > 0 || loadedImages?.length > 0) && (
        <>
          <PerfectScrollbar options={{ suppressScroll: false }}>
            <List className={classes.list}>
              {serverImages.map((image, i) => (
                <ListItem
                  key={i + 100}
                >
                  <img
                    src={`${tenant?.urls?.cdnurl}${imagePath}${image.filename}`}
                    className={classes.img}
                  />
                  <ListItemIcon className={classes.listElement}>
                    <>
                      <PageviewIcon
                        onClick={() => onViewImage(image.filename, true)}
                        className={classes.listIcon}
                      />
                      <DeleteForeverIcon
                        onClick={() => onDeleteImage(image.filename, true)}
                        className={classes.listIcon}
                      />
                    </>
                  </ListItemIcon>
                </ListItem>
              ))}
              {loadedImages.map((file, i) => (
                <ListItem
                  divider={i < loadedImages?.length - 1}
                  key={i}
                >
                  {file.croppedImage && (
                    <>
                      <img
                        onClick={() => editImage(file)}
                        file={file.name}
                        src={file.croppedImage ? tenant?.urls?.cdnurl + tenant?.tenant + '/' + file.croppedImage : tenant?.tenant + '/' + file.imageSrc}
                        alt="Cropped"
                        className={classes.imgEditable}
                      />

                      <ListItemIcon className={classes.listElement}>
                        <CropIcon
                          onClick={() => editImage(file)}
                          className={classes.listIcon}
                        />
                        <PageviewIcon
                          onClick={() => onViewImage(file.filename, false)}
                          className={classes.listIcon}
                        />
                        <DeleteForeverIcon
                          onClick={() => onDeleteImage(file.filename, false)}
                          className={classes.listIcon}
                        />
                      </ListItemIcon>
                    </>
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
        open={!!(deleteImage) || !!(viewImage)}
        {...rest}
      >
        <div className={classes.deleteContainer}>
          <img
            src={`${tenant?.urls?.cdnurl}${isDeleteImageInitial ? imagePath : tenant.tenant + '/'}${!!deleteImage ? deleteImage : viewImage}`}
            className={classes.deleteImg}
          />
        </div>
        <div className={classes.deleteControls}>
          {!!deleteImage && (
            <Button
              onClick={confirmDeleteImage}
              variant="contained"
              color="secondary"
              classes={{ root: classes.deleteButton }}
            >
              Delete Image
            </Button>
          )}
          <Button
            onClick={cancelViewOrDeleteImage}
          >
            Cancel
          </Button>
        </div>
      </Dialog>

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
                aspect={aspect.id}
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
              <div className={classes.aspectRatioContainer}>
                <JooTextField
                  label=""
                  name="aspect_ratio"
                  margin="dense"
                  options={AspectRatios}
                  className={classes.denseInput}
                  onChange={handleAspectChange}
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
  className: PropTypes.string,
  onImageUpdate: PropTypes.func,
  initialImages: PropTypes.array,
  imagePath: PropTypes.string
};

export default FilesDropzone;
