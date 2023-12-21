import {
  useSelector
} from 'react-redux';
import {
  CircularProgress,
  Backdrop,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 2000
  }
}));

function Spinner() {
  const classes = useStyles();
  const { spinner } = useSelector((state) => state.spinner);

  return (
    <>
      <Backdrop
        className={classes.root}
        open={spinner}
      >
        <CircularProgress />
      </Backdrop>
    </>

  );
}

export default Spinner;
