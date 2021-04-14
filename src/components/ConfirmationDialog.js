import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  makeStyles,
  useMediaQuery
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  deleteButton: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark
    }
  }
}));

const ConfirmationDialog = ({
  subsecion,
  open,
  onClickContinue,
  onClickCancel
}) => {
  const classes = useStyles();
  // const [openDialog, setOpenDialog] = React.useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // const handleClickOpen = () => {

  //   setOpenDialog(true);
  // };

  const handleClose = () => {
    // console.log('open=', open);
    // setOpenDialog(false);
    // open = false;
    // console.log('open=', open);
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {/* <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
        <DialogContent>
          <DialogContentText>
            Confirm delete Sub-Section <b>{subsecion.name}</b>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClickCancel} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            color="secondary"
            className={classes.deleteButton}
            onClick={onClickContinue}
            autoFocus
          >
            Delete
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmationDialog;
