import React, {
  useCallback,
  useEffect,
  useState
} from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Page from 'src/components/Page';
import Header from './Header';
import DemandInfo from './DemandInfo';
import DemandItems from './DemandItems';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const DemandDetailsView = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [demand, setDemand] = useState(null);

  const getDemand= useCallback(async () => {
    try {
      const response = await axios.get('/api/demands/1');

      if (isMountedRef.current) {
        setDemand(response.data.demand);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getDemand();
  }, [getDemand]);

  if (!demand) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Demand Details"
    >
      <Container maxWidth={false}>
        <Header />
        <Box mt={2}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={4}
              xl={3}
              xs={12}
            >
              <DemandInfo demand={demand} />
            </Grid>
            <Grid
              item
              md={8}
              xl={9}
              xs={12}
            >
              <DemandItems demandItems={demand.items} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
}

export default DemandDetailsView;
