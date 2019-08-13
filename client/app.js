import React, {useState, useEffect} from "react";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { useSnackbar  } from 'notistack';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 400,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    button: {
        margin: theme.spacing(1),
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
    iconSmall: {
        fontSize: 20,
    }
}));

const App = () => {

    const classes = useStyles();
    const host = `${window.location.protocol}//${window.location.hostname}:5000`;
    const { enqueueSnackbar } = useSnackbar();
    
    const [initialNumber, setInitialNumber] = useState(0);
    const [number, setNumber] = useState(0);
    const [fieldInvalid, setFieldInvalid] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);

     useEffect(() => {
         // Makes a request to Node API and sets the state
        fetch(`${host}/api/number`)
        .then(res => res.json())
        .then(data => {
            setNumber(data.number);
            setInitialNumber(data.number);
            enqueueSnackbar("Number is fetched from Node API.");
        });
     }, []);

     // Validates the textfield and enables or disables the submit button accordingly
    const validateField = (number) => {
        if(isNaN(number)) {
            setFieldInvalid(true);
            setErrorText("Only number");
            setSubmitBtnDisabled(true);
        } else {
            setFieldInvalid(false);
            setErrorText("");
            setSubmitBtnDisabled(initialNumber === number); 
        }   
    };

    // Event handler: onChange handler for textfield
    const handleChange = event => {
        let newNum = event.target.value;
        newNum = isNaN(newNum) ? newNum : +newNum;
        setNumber(newNum);
        validateField(newNum);        
    };

    // Event handler: onClick handler for save button
    // Saves the data upon successful data validation to server - number.json file
    const handleBtnClick = event => {
        if(fieldInvalid) {
            enqueueSnackbar(`${number} is invalid. Must be a number.`);
            return;
        }
        fetch(`${host}/api/number`, {
            method: "POST",
            body: JSON.stringify({"number": +number}), 
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                setInitialNumber(data.number);
                enqueueSnackbar(`${number} is saved to json file.`, { variant: "success"});
            })
            .catch(err => {
                enqueueSnackbar(`Failed to save ${number} to json file.`, { variant: "warning"});
                console.log("Error saving number: ", err);
            });
    };

    return (
        <Card className={classes.card}>
            <CardHeader title="React NodeJs Test App" />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Change the text in the textfield and hit save to update the text in json file in server.
                </Typography>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        error={fieldInvalid}
                        helperText={errorText}
                        id="filled-name"
                        label="Number"
                        className={classes.textField}
                        value={number}
                        onChange={handleChange}
                        margin="normal"
                        variant="filled"
                    />                    
                </form>
                <Button variant="contained" color="default" className={classes.button} onClick={handleBtnClick} disabled={submitBtnDisabled} >
                    <SaveIcon className={clsx(classes.leftIcon, classes.iconSmall)} />
                    Save
                </Button>
            </CardContent>   
        </Card>
    );
};

export default App;