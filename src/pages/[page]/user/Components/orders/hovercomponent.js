import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { FaEye } from "react-icons/fa";

const HoverEye = ({ data ,setorderid,setshowdetailsorder}) => {
    return (
        <Grid item>
            <Tooltip disableFocusListener disableTouchListener title={data}>
                <Button>
                    <FaEye onClick={(e) => {


                        setorderid()

                        setshowdetailsorder();
                    }} />
                    {/* <FaEye /> */}
                    </Button>


            </Tooltip>
        </Grid>
    );
}

export default HoverEye;