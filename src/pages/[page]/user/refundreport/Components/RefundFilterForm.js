import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import DateRangePicker from '@material-ui/lab/DateRangePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import Box from '@material-ui/core/Box';
import MobileDateRangePicker from '@material-ui/lab/MobileDateRangePicker';

const RefundFilterForm = ({register,handleSubmit,IsCustomdate,iscustomdate,value,setValue,onSubmit}) => {
    return (
        <>
            <h3 className="title">Refunds Report</h3>
            <form className="signupform main-sign-frm" onSubmit={handleSubmit && handleSubmit(onSubmit)}>
                <div className="Custom_filter">
                    <div className="date_range_filter">
                        Date Range: <input type="radio"
                            ref={register && register({
                                required: true,
                            })}
                            onClick={() => {
                                IsCustomdate('week')
                            }}
                            checked={iscustomdate === 'week' ? true : false}

                            name="filter_by_date" value="week" /> This Week
                                      <input

                            ref={register && register({
                                required: true,
                            })}
                            onClick={() => {
                                IsCustomdate('month')
                            }}
                            checked={iscustomdate === 'month' ? true : false}

                            type="radio" name="filter_by_date" value="month" /> This Month
                                      <input
                            ref={register && register({
                                required: true,
                            })}
                            type="radio" name="filter_by_date" value="custom"
                            onClick={() => {
                                IsCustomdate('custom')
                            }}
                            checked={iscustomdate === 'custom' ? true : false}

                        /> Custom Date
                            </div>
                    {iscustomdate === 'custom' &&
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDateRangePicker
                                startText="from"
                                endText="end"
                                value={value}
                                maxDate={new Date()}
                                onChange={(newValue, value) => {
                                    setValue(newValue);

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

                    <div className="order_id_filter">
                        Order Id :<input type="text" name="order_id"
                            ref={register && register({
                                required: false,
                            })}
                        />
                    </div>
                    {/* <div className="Status">
                                Status :
                              <select
                                    ref={register({
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
                    <button type="submit">Get Refunds</button>

                </div>
            </form>
        </>
    )
}
export default RefundFilterForm;