import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { FaInfo } from "react-icons/fa";

const Hover = ({data}) => {
    return (
        <Grid item>
            <Tooltip disableFocusListener disableTouchListener title={data}>
                <Button><FaInfo /></Button>
                
                
            </Tooltip>
        </Grid>
    );
}

export default Hover;