
import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import DateRangePicker from '@material-ui/lab/DateRangePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import Box from '@material-ui/core/Box';
import MobileDateRangePicker from '@material-ui/lab/MobileDateRangePicker';
import Link from 'next/link';

const FilterCommissionForm=({register,IsCustomdate,handleSubmit,onSubmit,setValue,iscustomdate,value})=>{
    return(
        <div className="headsection-graphical">
             <div className="commsion header">
                  <div className="common-static-left">
                    <h3 className="title1">Commission Statistics</h3>
                  </div>
                  <div className="common-static-right">
                  <Link href={`/us/user/dashboard`}>
                   <a> View All</a>
                   </Link>
                  </div>
                </div>

                <form className="signupform main-sign-frm" onSubmit={handleSubmit && handleSubmit(onSubmit && onSubmit)}>
                            <div className="Custom_filter">
                                <div className="date_range_filter">
                                     
                                     Date Range: 
                                     <input
                                        ref={register &&  register({
                                            required: true,
                                        })}
                                        onClick={() => {
                                            IsCustomdate('month')
                                        }}
                                        checked={iscustomdate==='month'?true:false}

                                        type="radio" name="filter_by_date" value="month" /> This Month
                                     
                                     
                                     <input type="radio"
                                        ref={register && register({
                                            required: true,
                                        })}
                                        onClick={() => {
                                            
                                            IsCustomdate('year')
                                        }}
                                        checked={iscustomdate ==='year'?true:false}

                                        name="filter_by_date" value="year" /> This Year
                                        
                                      {/* <input
                                        ref={register && register({
                                            required: true,
                                        })}
                                        type="radio" name="filter_by_date" value="custom"
                                        onClick={() => {
                                            IsCustomdate('custom')
                                        }}
                                    /> Custom Date */}
                            </div>
                                {iscustomdate === true &&
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <MobileDateRangePicker
                                            startText="from"
                                            endText="end"
                                            value={value}
                                            maxDate={new Date()}
                                            onChange={(newValue, value) => {
                                                setValue(newValue);
                                                console.log('value', value)

                                            }}
                                            renderInput={(startProps, endProps) => (
                                                <React.Fragment>
                                                    <TextField {...startProps} variant="standard"

                                                    />
                                                    <Box sx={{ mx: 2 }}> to </Box>
                                                    <TextField {...endProps} variant="standard" />
                                                </React.Fragment>
                                            )}
                                        />
                                    </LocalizationProvider>
                                }
                            
                            {/* <div className="order_id_filter">
                                Order Id :<input type="text" name="order_id"
                                    ref={register && register({
                                        required: false,
                                    })}
                                />
                            </div> */}
                            {/* <div className="Status">
                                Status :
                              <select
                                    ref={register && register({
                                        required: false,
                                    })}
                                    name="status"
                                    className="form-select form-select-lg mb-3"
                                    aria-label=".form-select-lg example"
                                >
                                    <option value="All" >All</option>

                                    <option value="Pending" >Pending</option>
                                    <option value="Paid" >Paid</option>
                                </select>
                            </div> */}
</div>
                            <div className="get_commision">
                                <button type="submit">Get Commissions</button>

                            </div>
                        </form>
        </div>
    )
}


export default FilterCommissionForm;