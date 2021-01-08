import React, { Component } from 'react';
import './SupportForm.css'
import { connect } from 'react-redux';
import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const styles = {
    container: {
        display: 'flex',
        width: '100%',
       
    },
    details: {
        flex: 1,
        minHeight: '200px',
    },
  
};

class SupportForm extends Component {

    state = {
        
    }
    handleChange = (inputValue, event) => {
        let supportForm = {
            ...this.props.reduxState.support[0], [inputValue]: event.target.value
        }
        this.props.dispatch({ type: 'SET_SUPPORT', payload: [supportForm] })
        console.log('Support is', supportForm);
    }//end handleChange

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_SUPPORT', payload: this.props.reduxState.support[0] })
        this.props.history.push('/thankYou')
    }

    render() {
        // same as below
        // const {
        //     classes,
        // }

        const { classes } = this.props;

        return (
            <div className="support">
                <Card className="supportFormCard">
                    <CardActionArea>

                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2" className="supportFormHeader">
                                How can I support you?
                         </Typography>

                            <form onSubmit={this.handleSubmit} className="formContainer">

                                <label>Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={this.props.reduxState.support.name}
                                    onChange={(event) => this.handleChange('name', event)} />
                                <br></br>
                                <br></br>
                                <label>Email:</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={this.props.reduxState.support.email}
                                    onChange={(event) => this.handleChange('email', event)} />
                                <br></br>
                                <br></br>
                                <label>Message:</label>
                                <input
                                    type="textarea"
                                    name="Message"
                                    value={this.props.reduxState.support.description}
                                    onChange={(event) => this.handleChange('description', event)} />
                                <br></br>
                                <br></br>
                                <button>Submit</button>
                            </form>

                        </CardContent>
                    </CardActionArea>

                </Card>
            </div>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({ reduxState });

export default connect(mapReduxStateToProps)(withStyles(styles)(SupportForm));
